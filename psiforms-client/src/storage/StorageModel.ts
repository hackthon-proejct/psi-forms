
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
