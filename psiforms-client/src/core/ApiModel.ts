
export enum AdType {
	leaderboard = 1,
	rectangle31 = 2,
	fullBanner = 3,
	halfBanner = 4,
	mediumRectangle = 5,
	popUnder = 6,
	squarePopUp = 7
}

export enum SyncStatus {
	syncing = 1,
	synced = 2,
	error = 3
}

export interface AdBoxDto {
	id: string;
	name: string;
	syncStatus: SyncStatus;
	networkId: number;
	isEnabled: boolean;
	isBanned: boolean;
	type: AdType;
	minQuantity: number;
	maxQuantity: number;
	unitPrice: string;
	income?: string;
	websiteUrl: string | null;
}

export interface AdBoxSummaryDto extends AdBoxDto {
	activeAds: number;
	waitingAds: number;
}

export enum AdStatus {
	waitingForApproval = 1,
	approved = 2,
	rejected = 3,
	rolledBack = 4,
	expired = 5
}

export interface AdDto {
	status: AdStatus;
	syncStatus: SyncStatus;
	id: string;
	adBoxId: string;
	imageUrl: string;
	url: string;
	createdAt: number;
	expiredAt?: number;
	quantity: number;
	value: string;
}

export interface AdSummaryDto extends AdDto {
	adBoxName: string;
	clicks: number;
	canRollback: boolean;
}
