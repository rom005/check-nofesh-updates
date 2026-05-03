const API_URL = 'https://nofesh.digital.idf.il/api/search/deals';
const DEFAULT_REFERER = 'https://nofesh.digital.idf.il/search-results?filters=y3g5y4f';

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

export async function fetchDeals() {
  const cookies = process.env.COOKIES || '';
  const referer = process.env.REFERER || DEFAULT_REFERER;

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
