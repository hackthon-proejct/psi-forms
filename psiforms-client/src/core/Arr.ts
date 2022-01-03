
export class Arr {

	public static distinct<T>(arr: T[]): T[] {
		return Array.from(new Set(arr));
	}
}
