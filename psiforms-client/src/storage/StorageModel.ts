
export interface StorageFormDto {
	id: string;
	name: string;
	description: string;
	fields: string;
	creator: string;
}

export interface FormDto extends StorageFormDto {
	isEnabled: boolean;
	unitPrice: string;
	minQuantity: number;
	maxQuantity: number;
	requireApproval: boolean;
}

export interface PreReceiptDto {
	message: string;
}

export interface PostReceiptDto {
	message: string;
	files: FileDto[];
}

export interface FileDto {
	name: string;
	url: string;
}
