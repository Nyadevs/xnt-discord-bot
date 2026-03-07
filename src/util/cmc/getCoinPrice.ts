import { ofetch } from 'ofetch';
import type { PriceData } from './types';

export default async function getCoinPrice(
	coinId: string,
	currency: string
): Promise<number | null> {
	const apiKey = process.env.COINMARKETCAP_API_KEY;
	if (!apiKey) {
		console.error('Missing COINMARKETCAP_API_KEY');
		return null;
	}

	const normalizedCurrency = currency.toUpperCase();
	const normalizedCoinId = coinId.trim();
	const slugCandidate = normalizedCoinId.includes('-')
		? normalizedCoinId.split('-').slice(1).join('-')
		: normalizedCoinId;
	const symbolCandidate = normalizedCoinId.split('-')[0]?.toUpperCase();

	const lookupParams: Array<Record<string, string>> = [];
	if (/^\d+$/.test(normalizedCoinId)) {
		lookupParams.push({ id: normalizedCoinId });
	} else {
		lookupParams.push({ slug: normalizedCoinId.toLowerCase() });
		if (slugCandidate && slugCandidate.toLowerCase() !== normalizedCoinId.toLowerCase()) {
			lookupParams.push({ slug: slugCandidate.toLowerCase() });
		}
		if (symbolCandidate) {
			lookupParams.push({ symbol: symbolCandidate });
		}
	}

	const seen = new Set<string>();
	for (const params of lookupParams) {
		const key = JSON.stringify(params);
		if (seen.has(key)) {
			continue;
		}
		seen.add(key);

		const response = await ofetch<PriceData>(
			'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
			{
				headers: {
					'X-CMC_PRO_API_KEY': apiKey,
					Accept: 'application/json'
				},
				query: {
					...params,
					convert: normalizedCurrency
				}
			}
		).catch((e) => {
			console.error('Error fetching price data:', e);
			return null;
		});

		const asset = response ? Object.values(response.data)[0] : null;
		const price = asset?.quote?.[normalizedCurrency]?.price ?? null;
		if (price !== null) {
			return price;
		}
	}

	return null;
}
