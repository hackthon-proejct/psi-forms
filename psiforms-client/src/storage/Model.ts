

// files

export interface FilePointer {
	name: string;
	size: number;
	hash: string;
	url: string;
}

// fields

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
	multiline: boolean;
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

// fields data

export interface FieldData {
	type: FieldType;
	label: string;
	value?: string;
	files?: FilePointer[];
}

// request

export enum RequestStatus {
	pending = 1,
	approved = 2,
	rejected = 3,
	rolledBack = 4
}
