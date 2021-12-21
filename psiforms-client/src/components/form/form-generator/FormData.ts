import { FieldType } from '../Form';

export interface FormData {
	email: string;
	quantity: number;
	fields: FieldData[];
}

export interface FieldData {
	type: FieldType;
	label: string;
	value: string;
}
