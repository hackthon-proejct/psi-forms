import { HttpClient } from '../core/HttpClient';

const COVALENT_API_KEY = 'ckey_3b3f3eb1d3734372b226efa0f8f';

export class CovalentClient {

	public static async getAvaxUsdPrice(): Promise<number> {
		const url = `https://api.covalenthq.com/v1/pricing/tickers/?quote-currency=USD&format=JSON&tickers=AVAX&page-number=0&page-size=1&key=${COVALENT_API_KEY}`;

		const response = await HttpClient.get<PricingResponse>(url);
		if (response.error || response.data.items.length < 0) {
			throw new Error('Cannot determine AVAX price');
		}
		return response.data.items[0].quote_rate;
	}
}

interface PricingResponse {
	error: boolean;
	data: {
		items: {
			contract_ticker_symbol: string;
			quote_rate: number;
		}[];
	}
}
