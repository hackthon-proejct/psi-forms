import BN from 'bn.js';
import Decimal from 'decimal.js';
import Web3 from 'web3';

export class UnitsConverter {

	public static toDecimal(value: BN, decimals: number): number {
		return new Decimal(value.toString()).div(new Decimal(10).pow(decimals)).toNumber();
	}

	public static toDecimalETH(value: BN | string): number {
		if (typeof value === 'string') {
			value = Web3.utils.toBN(value);
		}
		return UnitsConverter.toDecimal(value, 18);
	}

	public static fromDecimal(value: number, decimals: number): BN {
		return new BN(new Decimal(value).mul(new Decimal(10).pow(decimals)).toString());
	}

	public static fromDecimalETH(value: number): BN {
		return UnitsConverter.fromDecimal(value, 18);
	}
}
