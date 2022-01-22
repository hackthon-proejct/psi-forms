import BN from 'bn.js';
import Web3 from 'web3';

export class BNConverter {

	public static parseBN(value: string): BN {
		return Web3.utils.toBN(value);
	}

	public static toHex(value: BN): string {
		return Web3.utils.toHex(value);
	}
}
