import BN from 'bn.js';

export interface FormModel {
	id: string;
	name: string;
	description: string;
	itemPrice: BN;
	minQuantity: number;
	maxQuantity: number;
	approval: boolean;
	fields: FieldModel[];
}

export enum FieldType {
	text = 'text',
	number = 'number',
	file = 'file'
}

export interface FieldModel {
	type: FieldType;
	isRequired: boolean;
	label: string;
}

export interface TextFieldModel extends FieldModel {
}

export interface NumberFieldModel extends FieldModel {
	min?: number;
	max?: number;
}

export interface FileFieldModel extends FieldModel {
	fileType: FileType;
}

export enum FileType {
	any = 'any',
	image = 'image',
	pdf = 'pdf'
}

export const fileTypes = [ FileType.any, FileType.image, FileType.pdf ];
