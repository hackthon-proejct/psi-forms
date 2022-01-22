import BN from 'bn.js';

import { BNConverter } from './BNConverter';

test('BNConverter.parseBN() returns proper value', () => {
	const v256 = BNConverter.parseBN('0x100');
	expect(v256.eq(new BN(256))).toEqual(true);

	const v100 = BNConverter.parseBN('100');
	expect(v100.eq(new BN(100))).toEqual(true);
});

test('BNConverter.toHex() returns proper value', () => {
	const v256 = BNConverter.toHex(new BN(256));
	expect(v256).toEqual('0x100');
});
