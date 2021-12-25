import { Field, FieldType, FileField, FileType, NumberField, TextField } from '../../../Form';

export function initializeField(type: FieldType): Field {
	switch (type) {
		case FieldType.text:
			return { type, label: 'Label for Text Field', isRequired: false } as TextField;
		case FieldType.number:
			return { type, label: 'Label for Number Field', isRequired: false } as NumberField;
		case FieldType.file:
			return { type, label: 'Label for File Field', isRequired: false, fileType: FileType.any } as FileField;
		default:
			throw new Error(`Not supported type: ${type}`);
	}
}
