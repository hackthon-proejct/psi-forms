import Decimal from 'decimal.js';

export class EthFormatter {

	public static formatAddress(address: string): string {
		return address.substr(0, 6) + '...' + address.substr(-4);
	}

	public static formatAmount(value: string, decimals: number, symbol: string): string {
		return new Decimal(value).div(new Decimal(10).pow(decimals)).toFixed(5) + ' ' + symbol;
	}
}
