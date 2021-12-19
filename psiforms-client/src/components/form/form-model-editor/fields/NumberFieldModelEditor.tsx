import { Fragment } from 'react';

import { FieldModel, NumberFieldModel } from '../../FormModel';

export interface NumberFieldModelEditorProps {
	fieldModel: NumberFieldModel;
	onChanged: (newFieldModel: FieldModel) => void;
}

export function NumberFieldModelEditor(props: NumberFieldModelEditorProps) {

	function updateFieldModel(delta: Partial<NumberFieldModel>) {
		const nfm = Object.assign({}, props.fieldModel, delta);
		props.onChanged(nfm);
	}

	return (
		<Fragment>
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
			<div className="row">
				<div className="col">
					<div className="form-group">
						<label>Min:</label>
						<input type="number" />
					</div>
				</div>
				<div className="col">
					<div className="form-group">
						<label>Max:</label>
						<input type="number" />
					</div>
				</div>
			</div>
		</Fragment>
	);
}
