import { AdBoxDto, AdBoxSummaryDto, AdDto, AdSummaryDto, AdType } from './ApiModel';
import { HttpClient } from './HttpClient';

export class ApiClient {

	public static async createAdBox(networkId: number, publisher: string, type: AdType, name: string, email: string, websiteUrl: string | null): Promise<string> {
		return (await HttpClient.request<{ id: string }>('POST', `/api/publishers/${publisher}/4db0x3s`, {
			networkId,
			type,
			name,
			email,
			websiteUrl
		})).id;
	}

	public static async confirmAdBoxCreation(adBoxId: string, transactionHash: string): Promise<void> {
		await HttpClient.request<void>('PUT', `/api/4db0x3s/${adBoxId}/creation`, {
			transactionHash
		});
	}

	public static async confirmAdBoxUpdate(adBoxId: string, transactionHash: string) {
		await HttpClient.request<void>('PUT', `/api/4db0x3s/${adBoxId}/update`, {
			transactionHash
		});
	}

	public static async getAdBoxSummaries(publisher: string): Promise<AdBoxSummaryDto[]> {
		return await HttpClient.get(`/api/publishers/${publisher}/4db0x3s`);
	}

	public static async getAdBox(adBoxId: string): Promise<AdBoxDto> {
		return await HttpClient.get(`/api/4db0x3s/${adBoxId}`);
	}

	public static async getAdsToReview(adBoxId: string): Promise<AdDto[]> {
		return await HttpClient.get(`/api/4db0x3s/${adBoxId}/review`);
	}

	public static async createAd(networkId: number, advertiser: string, adBoxId: string, url: string, email: string | null, image: string, mimeType: string): Promise<string> {
		const pos = image.indexOf('base64,');
		image = image.substr(pos + 7);
		return (await HttpClient.request<{ id: string }>('POST', `/api/4dvert1s3rs/${advertiser}/4ds`, {
			networkId,
			adBoxId,
			url,
			email,
			image,
			mimeType
		})).id;
	}

	public static async confirmAdCreation(adId: string, transactionHash: string): Promise<void> {
		await HttpClient.request<void>('PUT', `/api/4ds/${adId}/creation`, {
			transactionHash
		});
	}

	public static async confirmAdApprovedOrRejected(adId: string, transactionHash: string): Promise<void> {
		await HttpClient.request<void>('PUT', `/api/4ds/${adId}/approval`, {
			transactionHash
		});
	}

	public static async confirmAdRolledBack(adId: string, transactionHash: string) {
		await HttpClient.request<void>('PUT', `/api/4ds/${adId}/rolledback`, {
			transactionHash
		});
	}

	public static async getAdSummaries(advertiser: string): Promise<AdSummaryDto[]> {
		return await HttpClient.get(`/api/4dvert1s3rs/${advertiser}/4ds`);
	}
}
