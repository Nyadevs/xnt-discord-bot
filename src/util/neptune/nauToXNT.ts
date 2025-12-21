import Big from 'big.js';

export default function nauToXNT(sompi: bigint | string | number): number {
	// @ts-expect-error	The typing is wrong, Big takes bigint
	return Big(sompi)
		.div((10n ** 30n).toString())
		.toNumber();
}
