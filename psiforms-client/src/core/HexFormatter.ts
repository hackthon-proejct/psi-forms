export class HexFormatter {

	public static format(hex: string): string {
		return hex.substring(0, 6) + '...' + hex.substring(hex.length - 4);
	}
}
