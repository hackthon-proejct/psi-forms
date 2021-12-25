import { Field, FieldType } from '../../../Form';
import { initializeField } from './FieldInitializator';
import { FieldEditor } from './FieldEditor';

export interface FieldsFormGroupProps {
	fields: Field[];
	onChange: (fields: Field[]) => void;
}

export function FieldsFormGroup(props: FieldsFormGroupProps) {

	function deleteFieldClicked(index: number) {
		const fields = props.fields.filter((_, i) => i !== index);
		props.onChange(fields);
	}

	function addFieldClicked(type: FieldType) {
		const field = initializeField(type);
		const fields = props.fields.concat([field]);
		props.onChange(fields);
	}

	function onFieldChanged(index: number, newField: Field) {
		const fields = [...props.fields];
		fields[index] = newField;
		props.onChange(fields);
	}

	return (
		<div className="form-section">
			<h4>Custom fields</h4>

			{props.fields.map((fm, index) =>
				<FieldEditor key={index} index={index} field={fm} onChanged={onFieldChanged} onDeleteClicked={deleteFieldClicked} />)}

			<div>
				<button className="btn btn-black" onClick={() => addFieldClicked(FieldType.text)}>Add Text</button>
				<button className="btn btn-black" onClick={() => addFieldClicked(FieldType.number)}>Add Number</button>
				<button className="btn btn-black" onClick={() => addFieldClicked(FieldType.file)}>Add File</button>
			</div>
		</div>
	);
}
