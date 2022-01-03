import { Field, FieldType, FileField, NumberField, TextField } from '../../../../../storage/Model';
import { FileFieldEditor } from './FileFieldEditor';
import { NumberFieldEditor } from './NumberFieldEditor';
import { TextFieldEditor } from './TextFieldEditor';


export interface FieldEditorProps {
	index: number;
	field: Field;
	onChanged: (index: number, newField: Field) => void;
	onDeleteClicked: (index: number) => void;
}

export function FieldEditor(props: FieldEditorProps) {

	function onDeleteClicked() {
		props.onDeleteClicked(props.index);
	}

	function onChanged(nfm: Field) {
		props.onChanged(props.index, nfm);
	}

	function Editor() {
		switch (props.field.type) {
			case FieldType.text:
				return <TextFieldEditor field={props.field as TextField} onChanged={onChanged} />;
			case FieldType.number:
				return <NumberFieldEditor field={props.field as NumberField} onChanged={onChanged} />;
			case FieldType.file:
				return <FileFieldEditor field={props.field as FileField} onChanged={onChanged} />;
			default:
				throw new Error(`Not supported field type: ${props.field.type}`);
		};
	}

	return (
		<div className="form-section-body">
			<span className="form-section-body-title">{props.field.type}</span>
			<span className="form-section-body-close">
				<button onClick={onDeleteClicked} className="close">x</button>
			</span>

			{Editor()}
		</div>
	);
}
