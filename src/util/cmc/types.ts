export interface CmcQuote {
	price: number;
}

export interface CmcAsset {
	quote: Record<string, CmcQuote>;
}

export interface PriceData {
	data: Record<string, CmcAsset>;
}
