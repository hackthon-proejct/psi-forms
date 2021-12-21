import { Field, FieldType, FileField, NumberField, TextField } from '../../Form';
import { FileFieldGenerator } from './FileFieldGenerator';
import { NumberFieldGenerator } from './NumberFieldGenerator';
import { TextFieldGenerator } from './TextFieldGenerator';

export interface FieldGeneratorProps {
	field: Field;
}

export function FieldGenerator(props: FieldGeneratorProps) {
	switch (props.field.type) {
		case FieldType.text:
			return <TextFieldGenerator field={props.field as TextField} />;
		case FieldType.number:
			return <NumberFieldGenerator field={props.field as NumberField} />;
		case FieldType.file:
			return <FileFieldGenerator field={props.field as FileField} />;
		default:
			throw new Error(`Not supported type: ${props.field.type}`);
	}
}
