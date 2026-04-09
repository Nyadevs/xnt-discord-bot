import { ofetch } from 'ofetch';

export default async function getNetworkHashrate(): Promise<bigint> {
	const hashrateData = await ofetch<{
		overview: {
			network_speed_24h: string;
		};
	}>('https://api.neptunescan.io/api/overview');
	return BigInt(hashrateData.overview.network_speed_24h);
}
