import { ofetch } from 'ofetch';

export default async function getNetworkHashrate(): Promise<bigint> {
	const hashrateData = await ofetch<{
		overview: {
			network_speed_24h: string;
		};
	}>('http://161.97.150.88:3001/api/overview');
	return BigInt(hashrateData.overview.network_speed_24h);
}
