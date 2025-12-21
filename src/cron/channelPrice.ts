import { priceCoinId, priceCurrency } from '@/config.ts';
import getCirculatingSupply from '@/neptune/functions/getCirculatingSupply';
import { StatsChannel } from '@/types/StatsChannel.ts';
import getCoinPrice from '@/util/coinpaprika/getCoinPrice';
import updateStatsChannel from '@/util/discord/updateStatsChannel.ts';
import handleStatsRequestError from '@/util/handleStatsRequestError.ts';
import nauToXNT from '@/util/neptune/nauToXNT';
import { formatNumber } from '@/util/numberFormatter';
import Big from 'big.js';
import { CronJob } from 'cron';

async function channelPriceCron() {
	try {
		const neptunePrice = await getCoinPrice(priceCoinId, priceCurrency).catch(
			handleStatsRequestError
		);
		const neptuneCirculatingSupply = await getCirculatingSupply().catch(handleStatsRequestError);
		if (neptunePrice !== null) {
			await updateStatsChannel(
				StatsChannel.Price,
				`price: ${neptunePrice.toFixed(2)} ${priceCurrency.toUpperCase()}`
			);
			if (neptuneCirculatingSupply !== null) {
				console.log('calculating market cap');
				const marketCap = new Big(neptunePrice).mul(nauToXNT(neptuneCirculatingSupply));
				await updateStatsChannel(
					StatsChannel.MarketCap,
					`market-cap: ${formatNumber(marketCap.toFixed(0), 0)} ${priceCurrency.toUpperCase()}`
				);
			}
		}
	} catch (e) {
		console.error(`An error encountered while running channelPriceCron: ${e}`);
	}
}

const channelPrice = new CronJob(
	'*/5 * * * *',
	channelPriceCron,
	null,
	false,
	'America/Los_Angeles',
	null,
	false,
	null,
	null,
	true
);
export default channelPrice;
