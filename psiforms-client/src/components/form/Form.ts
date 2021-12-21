import BN from 'bn.js';

export interface BlockchainForm {
	isEnabled: boolean;
	unitPrice: BN;
	minQuantity: number;
	maxQuantity: number;
}

export interface StorageForm {
	name: string;
	description: string;
	fields: Field[];
}

export interface Form extends BlockchainForm, StorageForm {
	id: string;
	requireApproval: boolean;
}

export enum FieldType {
	text = 'text',
	number = 'number',
	file = 'file'
}

export interface Field {
	type: FieldType;
	isRequired: boolean;
	label: string;
}

export interface TextField extends Field {
}

export interface NumberField extends Field {
	min?: number;
	max?: number;
}

export interface FileField extends Field {
	fileType: FileType;
}

export enum FileType {
	any = 'any',
	image = 'image',
	pdf = 'pdf'
}

export const fileTypes = [ FileType.any, FileType.image, FileType.pdf ];
