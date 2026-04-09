import { ofetch } from 'ofetch';

export default async function getCirculatingSupply(): Promise<bigint> {
	const supplyData = await ofetch<{
		overview: {
			total_reward: string;
		};
	}>('https://api.neptunescan.io/api/overview');
	return BigInt(supplyData.overview.total_reward);
}
