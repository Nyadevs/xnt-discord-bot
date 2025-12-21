import { ofetch } from 'ofetch';
import type { PriceData } from './types';

export default async function getCoinPrice(
	coinId: string,
	currency: string
): Promise<number | null> {
	return (
		(
			await ofetch<PriceData>(`https://api.coinpaprika.com/v1/tickers/${coinId}`).catch((e) => {
				console.error('Error fetching price data:', e);
				return null;
			})
		)?.quotes[currency.toUpperCase()]?.price ?? null
	);
}
