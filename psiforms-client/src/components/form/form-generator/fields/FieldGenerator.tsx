import { FilesContainer } from '../../../../storage/FilesContainer';
import { Field, FieldType, FileField, NumberField, TextField } from '../../../../storage/Model';
import { FileFieldGenerator } from './FileFieldGenerator';
import { NumberFieldGenerator } from './NumberFieldGenerator';
import { TextFieldGenerator } from './TextFieldGenerator';

export interface FieldGeneratorProps {
	field: Field;
	value?: string;
	files?: FilesContainer;
	onValueChanged: (value: string | undefined, isValid: boolean) => void;
	onFilesChanged: (value: FilesContainer, isValid: boolean) => void;
}

export function FieldGenerator(props: FieldGeneratorProps) {
	switch (props.field.type) {
		case FieldType.text:
			return <TextFieldGenerator field={props.field as TextField} value={props.value} onChanged={props.onValueChanged} />;
		case FieldType.number:
			return <NumberFieldGenerator field={props.field as NumberField} value={props.value} onChanged={props.onValueChanged} />;
		case FieldType.file:
			return <FileFieldGenerator field={props.field as FileField} files={props.files} onChanged={props.onFilesChanged} />;
		default:
			throw new Error(`Not supported type: ${props.field.type}`);
	}
}
