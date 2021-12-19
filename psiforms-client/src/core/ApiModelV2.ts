
export interface FormDto {
	id?: string;
	name: string;
	description: string;
	itemPrice: string;
	minQuantity: number;
	maxQuantity: number;
	approval: boolean;
	fields: string;
}
