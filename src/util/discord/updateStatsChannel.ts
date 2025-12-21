import { statsChannelIds } from '@/config.ts';
import type { StatsChannel } from '@/types/StatsChannel.ts';
import setChannelName from '@/util/discord/setChannelName.ts';

export default async function updateStatsChannel(statsChannel: StatsChannel, newName: string) {
	const statsChannelId = statsChannelIds[statsChannel];
	console.log(statsChannelId);
	if (!statsChannelId) {
		throw new Error(`Stats Channel ID for ${statsChannel} not found in config`);
	}
	await setChannelName(statsChannelId, newName);
}
