import { Field, FieldData, FilePointer, RequestStatus } from './Model';

export interface CreatorProfileDto {
	email: string;
}

export interface StorageFormDto {
	id: string;
	isEnabled: boolean;
	name: string;
	description: string;
	fields: Field[];
	creator: string;
}

export interface FormDto extends StorageFormDto {
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
	value: string | null;
	createdAt: Date;
	sender: string;
	formId: string;
	email: string;
	fields: FieldData[];
}
