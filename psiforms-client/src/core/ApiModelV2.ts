
export interface BasicsFormDto {
	id: string;
	name: string;
	description: string;
	fields: string;
}

export interface FormDto extends BasicsFormDto {
	isEnabled: boolean;
	unitPrice: string;
	minQuantity: number;
	maxQuantity: number;
	requireApproval: boolean;
}
