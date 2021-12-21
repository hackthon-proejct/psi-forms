import { Fragment } from 'react';

import { Field, NumberField } from '../../Form';

export interface NumberFieldEditorProps {
	field: NumberField;
	onChanged: (newField: Field) => void;
}

export function NumberFieldEditor(props: NumberFieldEditorProps) {

	function updateField(delta: Partial<NumberField>) {
		const nfm = Object.assign({}, props.field, delta);
		props.onChanged(nfm);
	}

	return (
		<Fragment>
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
