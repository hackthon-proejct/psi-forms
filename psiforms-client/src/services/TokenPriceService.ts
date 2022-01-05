import { CovalentClient } from './CovalentClient';

export class TokenPriceService {

	private static avaxUsdPrice?: number;

	public static async getAvaxUsdPrice(): Promise<number> {
		if (TokenPriceService.avaxUsdPrice === undefined) {
			TokenPriceService.avaxUsdPrice = await CovalentClient.getAvaxUsdPrice();
		}
		return TokenPriceService.avaxUsdPrice;
	}
}
