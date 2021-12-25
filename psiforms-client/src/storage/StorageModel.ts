import { Field, FieldData, FilePointer, RequestStatus } from './Model';

export interface StorageFormDto {
	id: string;
	name: string;
	description: string;
	fields: Field[];
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
	files: FilePointer[];
}

export interface RequestDto {
	id: string;
	status: RequestStatus;
	createdAt: Date;
	sender: string;
	formId: string;
	email: string;
	fields: FieldData[];
}
