import { FieldModel, FieldType, FileFieldModel, NumberFieldModel, TextFieldModel } from '../../FormModel';
import { FileField } from './FileField';
import { NumberField } from './NumberField';
import { TextField } from './TextField';

export interface FieldProps {
	fieldModel: FieldModel;
}

export function Field(props: FieldProps) {
	switch (props.fieldModel.type) {
		case FieldType.text:
			return <TextField fieldModel={props.fieldModel as TextFieldModel} />;
		case FieldType.number:
			return <NumberField fieldModel={props.fieldModel as NumberFieldModel} />;
		case FieldType.file:
			return <FileField fieldModel={props.fieldModel as FileFieldModel} />;
		default:
			throw new Error(`Not supported type: ${props.fieldModel.type}`);
	}
}
