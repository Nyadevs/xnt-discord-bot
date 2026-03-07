// This file provides all the necessary non-secret configuration
import { StatsChannel } from '@/types/StatsChannel.ts';

export const statsChannelIds: { [key in StatsChannel]: string } = {
	[StatsChannel.Price]: '1452408776882651378',
	[StatsChannel.Hashrate]: '1452409009251291308',
	[StatsChannel.CirculatingSupply]: '1452408895896031303',
	[StatsChannel.MarketCap]: '1452408822130933850'
};

export const priceCoinId = 'neptune-io';

export const priceCurrency = 'usd';

export const twitterHandle = 'neptuneprivacy';

export const telegramChannel = '@neptuneprivacy';
