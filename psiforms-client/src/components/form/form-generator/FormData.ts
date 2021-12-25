import { FilesContainer } from '../../../storage/FilesContainer';
import { FieldType } from '../../../storage/Model';

export interface FormData {
	email: string;
	quantity: number;
	fields: FormFieldData[];
}

export interface FormFieldData {
	type: FieldType;
	label: string;
	value?: string;
	files?: FilesContainer;
}
