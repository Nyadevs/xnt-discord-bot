import { ofetch } from 'ofetch';

export default async function getCirculatingSupply(): Promise<bigint> {
	const supplyData = await ofetch<{
		overview: {
			total_reward: string;
		};
	}>('http://161.97.150.88:3001/api/overview');
	return BigInt(supplyData.overview.total_reward);
}
