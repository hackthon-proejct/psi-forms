
export interface FormDto {
	id: string;
	name: string;
	description: string;
	unitPrice: string;
	minQuantity: number;
	maxQuantity: number;
	requireApproval: boolean;
	fields: string;
}
