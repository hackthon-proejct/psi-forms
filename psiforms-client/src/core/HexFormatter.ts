export class HexFormatter {

	public static formatHex(address: string): string {
		return address.substr(0, 6) + '...' + address.substr(-4);
	}
}
