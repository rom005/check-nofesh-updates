const API_URL = 'https://nofesh.digital.idf.il/api/search/deals';
const DEFAULT_REFERER = 'https://nofesh.digital.idf.il/search-results?filters=y3g5y4f';
const COOKIES = 'dtCookie8knjc5a6=v_4_srv_1_sn_69AB7ED895DCE9E6AA581C19659740A2_perc_100000_ol_0_mul_1_app-3Ac33f4519dd120288_1; rxVisitor8knjc5a6=17776375642790VDU17P7KHUS2G78AR9CVG0EHPG5J1U1; _ga=GA1.1.774120147.1777637566; __Host-rt-14a52d73-e832-4c13-8be9-955361147e29=uATYBy-hAKEXpFoB.fZuLK7lvWDDGR_IVUCneNk82SBBhgsJO28AsK_QLa8k1rA79P84SonD7xXnQOxYHBPTUjRleTBOhDeRL8t9FuD2Jl6HAvNYv1KGis7QRcLQX99wYevuaRsKZ6GVgQ1_VtMuK8-Yv7LTScQMNVz7XnyVK9g53zKDM97phdzzr1deRCOnN4_U-KY9FEHXlo_3m3gtQ-1UHVFr8lD1Cz5wvdJBz07gxKmxgRGZCRKyN2PCgB7L1wLl9J7ZbY3N8WB_EtKBKNZ0MMAGcOB1t1KpmhC0cJijgR1JZlUFCVNzblVwcM--yrRqa5yH-SHfy30AICP5WBmr4Rc8oejhOWW9qGS481bXm0Xa6W-ps-htus2N_DSe5HexNJrMhP9j4PuUKD9liCVwoLDw-h18plczbgdxfmn-0pyWrJbxylvAd5nT27xn0aG4DgaZ5BpfBPu-lgheoapNeKR0358yQzW-mQCqCSlKQNIKQKA2I2Z9xIqkdXjVd0aOGamVwwS-3WwtiuWAZ-DEtBimYLIjpGr3sakFwd0ANViLW4HYtfGDKfTlo50jT_aa2_pu5yPocKQiJKPVtQmjIZe49LOoljkM9sN9AvSNoAzXFDn6_03WUFbAFBJVyDGTqU6B05zPiENNfspQvUNAjpiAD6W_6KdaIk3dzZMTM-JsWFXZbnqrHw5hoIQKV7JG4FvPKx50dZv_w1HxFU_s5sbv6eSmOZbz1HN1_5vwLUx41Ha3SxvQU4jNkpO1XqbAWwWKSz80-NmRo3-7uQZGslqrgg1hSZV4QnnWWD3A2P9yywB1-QKZ0bebptkH7lOmhKcUgXN1c-d0swGZjDFZSZbpUE8FF7TUZ41Ia7kmqI_03apu2m81U5pQeq-1mdfbUvRfjMun0ruRPEK2i5Di7-rTLKcfZ-En3XTcv-xw6gcLom4Br2_hvATpUpSdoTM9-WcyflyovqXakjLA7fagZ8quhrF_YwLd8aYT5Am0lnXf2V20v3hxY9lsphw1g_-iy5aj1h-x0rzFpW82Y3PRVxNKehKMgazLtYyc0cb8tD6hAEHGo25PrPlzP-LTRf7gz3h8hn7aPeGN69L-Sl4rUeqbPLrBlY_uWW3BeUjhHLhpxhwj1knsfNPMTBQMkUvL-YZpe4X_y-uOcf9i4lna75CubIxE2zLitqCEjhaAq-DTPpTLSO0d2f8jYLh1v91CHVaqDcIMYP57ZyqoJXNCW1ZFy1JWTGsaPSYpCaDhdncff3bABn-YhAohrB_hDTQb0znsE8-jWFpJSDjK4c4UQdCu7JjyOa-aqpExkhWArS7HsYHE3-90jFDhIGQbx-TD_jV6RGQU45CUkgDK9cZOd11VM1vVoG0vIr6Kk3qZ_oiykfDy3_FcPUNyKIzHf3ZJKsg0W5hM6u1sCY08pJypLBWIPf4xeEP2mm1iUVNFGKBkGf5A6tEnE-s9wKf1gd7QscPQob5kjfPZDZuyKLw-R5oH0xdn-GOMmBXRUDJKhIqlr70o-lUv-cE5QcuizNKTuewD3ltAiW8yPdW3SJ4NDZmzgTkYKSjS_bWBbauy08eEcTB7NUAOLwBieaReMSQfeVh5NUtnBmNqNKhFNDHWJO8FMYKvB_TUqPwqtdvGsDP0Pj_s-aD8nnIfRB7dA5jDA4qKwwNYW53iZgPEIWb-K19LAsAzyqRuxerjw_Xkav8gXweju7sE7jt7A6F8I3hKyKWYhfduY1QCFFWBfYsRo14wKSy0IhtZqPVQHk_C0qZp9ophGWZk3ToQu4NJR6m7Kt5NIBm1K0wgWfn63mwjw2iHC_lPSWOCQgNBnK3h4lVv-H7IkrZMCx6qkh6DTmLkIJy6djAQ-1zZkcVxv0JnETgyPdEQ5ySml7gPMRb_SiRL0VGVEwn9hIU6X4E2JfB_CKlfgdYwHKEbJM5fyIYE3OrVDnJv3H4U_aIi-k5Nh06bqNZgC5o5pveQA2YNUAwdEpJEmtWdm5t3eW3iaV3lmLdq9RM35tLBxnNeVlF4Wy5zq9ZGnUpKUDSUSrHbS5FfTAJc8YPdShwj2Ytu1DN2uUd35-V5QAt-cghpUxhUKAjD7ivMDDTkHTBchp7OxMwgRhcXo-fDILRzk4gChMupV7p0eHNibW7Fv9_LRlP1UaOMzYm2khIZwuswkwn5BbZ-Ed5-mcGRS1EZBty8wXQIHGK-ZtJ11ji7L-3ZXZGlmI8shFKfc8iso3sgaQkKiiFLrxsne4rao6SnicHr2SN0.QaJjUbet6EPTkBmKcQ6gIA.; dtSa8knjc5a6=-; __Host-at-14a52d73-e832-4c13-8be9-955361147e29=LYGUSg5SEmHUEaX-.aSQGBRR1xsItUMl2zI_iaNRi18O1K1hZzuZ28AiYMzGUNrI3CMX2W3iXetfswiy7tciBshZdVSXsgqEUCc1M7OuDbFnFq2jtYRrlvpfW1YLE3SvMBMqkVDrl1NXMpzCybVy0cunAndUmX48LjDShsfbwhbBbcweUmqcB6730Cq3iJ9EJyZI0bOO9Uok-QenhlOqiAYK_kXOCv1AXO5gZP9I8zXpCj95Nb6BJ-k5_a3KvvUjI7lkvVvebneCJzVNke8GDUWGq8Irfm1q1v55odXa8i2ZrmVQYq8Cpt6DLLDp2jVBU54il43RwJDZVfxNIFjW7y9URy0fXyAtkDuNgA-zZqTI8TRtU5VvG5_p0M8ERsABnJUxz35xaL0yxge_xwI1fiWHyfZFMKBdumYbVTXbp4fTsYJ3UNy85xPyYSTrcSpd15RjaVWBiIHjX8qeccmiILqfBEvWEBpvTQyJsoY74jMyF2LcBgZ9qF_eLnBHkhZUqdJztb56qQnpjT9r-dnHt19IPjkXKAIh_8NBucR5hlWCJ4GNk9D0FBOmM_jsw_Xcs3_pgQ6D0NyVf2K8U75asMZnD9g7aJd_0P02fnUNR_QyjVDrpuUEJNBTg3sou9UzejWy496Bpwbq0MSWZrGyayuGMP5Dp-vbAD4OMbOcsBYogOfAdBr752PrNx69eC3XbPAo4LlE7OztgXWMOsWzl8_6gsZPAxVQCa49JBIpe7MUSsyLZYOOKvnWnTLTjg098fHbEo2yqF6PKG9BYQeQz8JBYgkior9aDPVFGayEU9MjrhWkDRI3AjaF0DW1VThb5ZDaV3H7_0SBQ-lct76lLAYzytFAQZvV2KweWDy2L_TX6-ot_X2bIWA89zWRGXWDZZ6Uu5PEQJMRevdyia0ffw3PKx_J23eGaerLLR6PhRBDAp3CJzRH9MwFl66pf-5Jh9RJEc2qEoOlJ5H1PoFTI1OxZh745vAjkQEls_R4fsBXLn22k0sLMX8o-rCHbvE_YdzucBK7wGDG00V4K3HtmxUvguEdKXpmECOXfK7sYBjo07FhZ-BSN1dD8KVCOcY7uHji0iCBCo9VCfuTLfuAdQVp5yuT2TBYj3Hd6u64W1G6HS6yj7RMZ0G8pUF6MX-B9K36R1S_PlZrEFCERD7kE4wusXIl9pDnd9ofvtfmFjsof9RNvuVrIMWl4iDRTPtTUWM09ROcRR7rGQLmb2fsMZruremf_rbBLAcOwKUtojXwTK5NKn_rbpLHUPnHluVBHAHmDQgMxNjy8B3OdDSY_91gR_U5K45GEZjZcyXp9axdD4iXgg6q_0P-eBl1v8FVC6RpBPwG6IjvpwDmZ9zifFuknI9wDOa9ZjlBv-fG5p2o_38qVFjTjW-DnwMZ1ju1M073b2i42FpxH1FyqY9jL2jaM3l153hzDSjggN2ID4ctp9TpsDLMd6u8LbobCMWj6FAJx9mCxFr0ADpVfj2tMiYWYA1FIvRZS46VtJnJ6hTVGKTa_vj8Qp8fQRYE-Gpo7gUELQiJeiEi6fPqt3r5Y0BxLBkzThZipEqYB1_-OgPk9Wl95NCzcO3TnGEw0oxhe1S9-kjQpTx77QZYbyltScqx2OObM5DFH5ENPKMQ0XFYZhIo_Hr_QCu3cHRc7oYkD2vHqsifFdukrZPEagc84qiNUKay_Yqolcbf_mVRgTGsJnvCeUV3cteXh47W1PDOiu00NQpJfJ_P5hQakYvIc3YXwqUeO9Au_Gx0FY3BXW0NKsPvHOMbwxZEXreiljL9YoY_2n3j0Q4IM9BmBYqDW9QSYJpUhrk5vGq1m7mYFZTDgiEsGTy2wBYGv1P1yvmyrgKoOqcQtHTkFaj1y0b3xwmi6z60TQPJakCKvHvxAG-HLci4TjMZNCW3_iPVriTuQWQ2if-140VYv1mk4w_NwO7Q5BOD1bn_8VL4hfr7WW23PlyYyph5C69JwlGYGqWSMEsmCPcNf-HWUyuCwOc52gDTDWWfKi8XFyY31qZrhEF-N-_gklo-qD9uF5GrW-JohyHXhpB9O47Y5EdUe4Z5YX0xTUt_iowS2RLjitMyQsL_ZcZqEebnUjJ0ubyAtYWuRDX8uOsxSfZpDMXEIvbOspJ3oz2I9KcX6LJruujPVZgVcxbve9sswHTXUtYSQC6SvG02ADdTmK2cl5xdYLwsgmJ9KYd9k_QTgUOH5HRmBpr0O79aKRMqALGAJn6Bng9Kh83uEAz0yl8YOp3fsyQZ0nz18HuXVN28oahHgvXPi22GRX2rvhCFFilLuyyggP9ZGAvQzI9_sgBZjARhvXyRi4E81rHCEjlAH1ogSVcqTF2cy1cXFTd9fTIYXr3cApi5-aovUtTL7ubH6IXfW2Ovq6ysSv_-PRA1K9sWkfkqBtwn0Z5fs_QtxeTsFCLic-uLOmtafHK44EtWrycRIQgjv3WybTWZWgXMEJwbO2LCfvKcRsY8fTw.zrSPkopZKPdkYPC-jIZJbg.; _ga_95QS41XRX0=GS2.1.s1777637566$o1$g1$t1777638389$j17$l0$h0; rxvt8knjc5a6=1777640189242|1777637564283; dtPC8knjc5a6=1$437609238_614h57vGRFAMUDCIGPLDCOHSCOOHUOWAOLFMHCA-0e0';

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
  const cookies = COOKIES;
  const referer = env.REFERER || DEFAULT_REFERER;

  if (!cookies) {
    throw new Error('Missing cookies in worker code');
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

function isAuthorized(request, env) {
  const requiredToken = env.TRIGGER_TOKEN;
  if (!requiredToken) {
    return true;
  }

  const provided =
    request.headers.get('x-trigger-token') ||
    new URL(request.url).searchParams.get('token');

  return Boolean(provided) && provided === requiredToken;
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

    if (!isAuthorized(request, env)) {
      return new Response('Unauthorized', { status: 401 });
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
