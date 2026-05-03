const API_URL = 'https://nofesh.digital.idf.il/api/search/deals';

const DEFAULT_BODY = JSON.stringify({
  filters: {
    when: {
      startDate: '',
      endDate: '',
      months: ['9', '8', '7'],
      type: 'ALL'
    },
    where: {
      areas: [],
      hotels: []
    },
    excludeWhere: {
      areas: [],
      hotels: []
    },
    guests: {
      adults: 2,
      children: [],
      value: 'couple'
    },
    hotelProperties: [],
    pensionType: [],
    baskets: [],
    level: ['2', '3']
  }
});

function getDealKey(deal) {
  const primaryId =
    deal?.id ??
    deal?.dealId ??
    deal?.packageId ??
    deal?.roomId ??
    deal?.offerId ??
    null;

  const hotelId =
    primaryId ??
    deal?.hotelId ??
    deal?.hotel?.id ??
    deal?.hotelUUID ??
    deal?.hotelID ??
    deal?.hotel_id ??
    null;

  const basketId = deal?.basketId ?? deal?.basket?.id ?? '';
  const dates = Array.isArray(deal?.availableDates)
    ? deal.availableDates
        .map((d) => `${d?.startDate ?? ''}-${d?.endDate ?? ''}`)
        .join('|')
    : '';

  if (hotelId || basketId || dates) {
    return [hotelId ?? '', basketId, dates].join('::');
  }

  if (deal && typeof deal === 'object') {
    return JSON.stringify(deal);
  }

  return null;
}

function findNewDeals(oldDeals, newDeals) {
  const oldIds = new Set(oldDeals.map((d) => getDealKey(d)).filter(Boolean));
  return newDeals.filter((d) => {
    const key = getDealKey(d);
    return key ? !oldIds.has(key) : true;
  });
}

function extractDeals(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.deals)) return data.deals;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.results?.items)) return data.results.items;
  return null;
}

async function fetchDeals(env) {
  const cookies = (await env.COOKIES_KV.get('cookies')) || '';
  const referer = env.REFERER || DEFAULT_REFERER;

  if (!cookies) {
    throw new Error('Missing cookies in KV (key: cookies)');
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9,he-IL;q=0.8,he;q=0.7',
      'content-type': 'application/json',
      'priority': 'u=1, i',
      'sec-ch-ua': '"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'x-dtpc': '1$437609238_614h57vGRFAMUDCIGPLDCOHSCOOHUOWAOLFMHCA-0e0',
      'x-dtreferer': referer,
      'cookie': cookies,
      'Referer': referer
    },
    body: DEFAULT_BODY
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Deals API failed: ${response.status} ${body}`);
  }

  return response.json();
}

async function sendTelegramMessage(env, text) {
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return false;
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram send failed: ${response.status} ${body}`);
  }

  return true;
}

async function runOnce(env) {
  const data = await fetchDeals(env);
  const deals = extractDeals(data);

  if (!Array.isArray(deals)) {
    throw new Error('Deals response missing results array');
  }

  const previous = (await env.LAST_DEALS.get('last_deals', 'json')) || [];
  const newOnes = findNewDeals(previous, deals);

  await env.LAST_DEALS.put('last_deals', JSON.stringify(deals));

  const summary = `[${new Date().toISOString()}] Deals: ${deals.length} | New: ${newOnes.length}`;
  await sendTelegramMessage(env, summary);
}

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(
      runOnce(env).catch(async (err) => {
        const message = `[${new Date().toISOString()}] Error: ${err?.message || err}`;
        await sendTelegramMessage(env, message);
      })
    );
  },
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/trigger') {
      return new Response('Not Found', { status: 404 });
    }

    try {
      await runOnce(env);
      return new Response('OK', { status: 200 });
    } catch (err) {
      const message = `[${new Date().toISOString()}] Error: ${err?.message || err}`;
      await sendTelegramMessage(env, message);
      return new Response('Error', { status: 500 });
    }
  }
};
