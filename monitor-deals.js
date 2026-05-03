import 'dotenv/config';
import fs from 'fs/promises';
import { fetchDeals } from './deals-client.js';
import { sendTelegramMessage } from './telegram-client.js';

// ---- CONFIG ----
const RESULT_FILE = './last_deals.json';
const POLL_INTERVAL = process.env.POLL_INTERVAL ? parseInt(process.env.POLL_INTERVAL) : 60;


function randomWait(min = 600, max = 2000) {
  return new Promise((res) => setTimeout(res, min + Math.random() * (max - min)));
}
async function loadDeals() {
  try { const txt = await fs.readFile(RESULT_FILE, 'utf8'); return JSON.parse(txt); } catch { return []; }
}
async function saveDeals(deals) {
  await fs.writeFile(RESULT_FILE, JSON.stringify(deals, null, 2), 'utf8');
}
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
  return [];
}

async function main() {
  while (true) {
    let error = null;
    let newDealsCount = 0;
    try {
      const data = await fetchDeals();
      const interceptedDeals = extractDeals(data);

      const prevDeals = await loadDeals();
      const newOnes = findNewDeals(prevDeals, interceptedDeals);
      newDealsCount = newOnes.length;

      if (newOnes.length > 0) {
        console.log(`--- ${newOnes.length} NEW DEAL(S) FOUND ---`);
        for (const deal of newOnes) {
          console.log(deal);
          console.log('-----------------------------');
        }
      } else {
        console.log(`[${new Date().toISOString()}] No new deals.`);
      }
      await saveDeals(interceptedDeals);

      const summary = `[${new Date().toISOString()}] Deals: ${interceptedDeals.length} | New: ${newDealsCount}`;
      await sendTelegramMessage(summary);
    } catch (e) {
      error = e;
      console.error('Error during monitoring:', e);
      try {
        const message = `[${new Date().toISOString()}] Error: ${e?.message || e}`;
        await sendTelegramMessage(message);
      } catch (notifyError) {
        console.error('Error sending Telegram message:', notifyError);
      }
    }
    const base = POLL_INTERVAL * 1000;
    const nextWait = Math.floor(base * (0.80 + Math.random() * 0.4));
    if (!error) await randomWait(nextWait, nextWait + 1500);
    else await randomWait(nextWait, nextWait + 1500);
  }
}

main();
