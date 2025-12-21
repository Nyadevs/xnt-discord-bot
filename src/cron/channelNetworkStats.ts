import getCirculatingSupply from '@/neptune/functions/getCirculatingSupply';
import getNetworkHashrate from '@/neptune/functions/getNetworkHashrate';
import { StatsChannel } from '@/types/StatsChannel.ts';
import updateStatsChannel from '@/util/discord/updateStatsChannel.ts';
import handleStatsRequestError from '@/util/handleStatsRequestError.ts';
import formatHashrate from '@/util/neptune/formatHashrate';
import sompiToKas from '@/util/neptune/nauToXNT';
import { formatNumber } from '@/util/numberFormatter.ts';
import { CronJob } from 'cron';

async function channelNetworkStatsCron() {
	try {
		console.log('fleja');
		const hashrate = await getNetworkHashrate().catch(handleStatsRequestError);
		const supply = await getCirculatingSupply().catch(handleStatsRequestError);
		if (hashrate !== null)
			await updateStatsChannel(StatsChannel.Hashrate, `hashrate: ${formatHashrate(hashrate)}`);

		if (supply !== null)
			await updateStatsChannel(
				StatsChannel.CirculatingSupply,
				`supply: ${formatNumber(sompiToKas(supply), 0)} XNT`
			);
	} catch (e) {
		console.error(`An error encountered while running channelNetworkStatsCron: ${e}`);
	}
}

const channelNetworkStats = new CronJob(
	'*/5 * * * *',
	channelNetworkStatsCron,
	null,
	false,
	'America/Los_Angeles',
	null,
	false,
	null,
	null,
	true
);

export default channelNetworkStats;
