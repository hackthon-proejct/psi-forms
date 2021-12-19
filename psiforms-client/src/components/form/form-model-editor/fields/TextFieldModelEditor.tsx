import { FieldModel, TextFieldModel } from '../../FormModel';

export interface TextFieldModelEditorProps {
	fieldModel: TextFieldModel;
	onChanged: (newFieldModel: FieldModel) => void;
}

export function TextFieldModelEditor(props: TextFieldModelEditorProps) {

	function updateFieldModel(delta: Partial<TextFieldModel>) {
		const nfm = Object.assign({}, props.fieldModel, delta);
		props.onChanged(nfm);
	}

	return (
		<div className="row">
			<div className="col">
				<div className="form-group">
					<label>Label: *</label>
					<input type="text" value={props.fieldModel.label} onChange={e => updateFieldModel({ label: e.target.value })} />
				</div>
			</div>
			<div className="col">
				<div className="form-group">
					<label>Is required:</label>
					<input type="checkbox" checked={props.fieldModel.isRequired} onChange={() => updateFieldModel({ isRequired: !props.fieldModel.isRequired })} />
				</div>
			</div>
		</div>
	);
}
