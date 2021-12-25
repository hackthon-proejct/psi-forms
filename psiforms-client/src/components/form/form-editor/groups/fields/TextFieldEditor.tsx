import { Field, TextField } from '../../../../../storage/Model';

export interface TextFieldEditorProps {
	field: TextField;
	onChanged: (newField: Field) => void;
}

export function TextFieldEditor(props: TextFieldEditorProps) {

	function updateField(delta: Partial<TextField>) {
		const nfm = Object.assign({}, props.field, delta);
		props.onChanged(nfm);
	}

	return (
		<div className="row">
			<div className="col">
				<div className="form-group">
					<label>Label: *</label>
					<input type="text" value={props.field.label} onChange={e => updateField({ label: e.target.value })} />
				</div>
			</div>
			<div className="col">
				<div className="form-group">
					<label>Is required:</label>
					<input type="checkbox" checked={props.field.isRequired} onChange={() => updateField({ isRequired: !props.field.isRequired })} />
				</div>
			</div>
		</div>
	);
}
