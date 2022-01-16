import { Field, FieldType, FileField, FileType, NumberField, TextField } from '../../../../../storage/Model';

export function initializeField(type: FieldType): Field {
	switch (type) {
		case FieldType.text:
			return { type, label: 'Text', isRequired: false } as TextField;
		case FieldType.number:
			return { type, label: 'Number', isRequired: false } as NumberField;
		case FieldType.file:
			return { type, label: 'File', isRequired: false, fileType: FileType.any } as FileField;
		default:
			throw new Error(`Not supported type: ${type}`);
	}
}
