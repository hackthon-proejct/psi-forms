import { Fragment } from 'react';

import { Field, NumberField } from '../../../Form';

export interface NumberFieldEditorProps {
	field: NumberField;
	onChanged: (newField: Field) => void;
}

export function NumberFieldEditor(props: NumberFieldEditorProps) {

	function updateField(delta: Partial<NumberField>) {
		const newField = Object.assign({}, props.field, delta);
		console.log(newField);
		props.onChanged(newField);
	}

	function onMinChanged(text: string) {
		const value = parseInt(text, 10);
		updateField({ min: isNaN(value) ? undefined : value });
	}

	function onMaxChanged(text: string) {
		const value = parseInt(text, 10);
		updateField({ max: isNaN(value) ? undefined : value });
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
						<input type="number" value={props.field.min || ''} onChange={e => onMinChanged(e.target.value)} />
					</div>
				</div>
				<div className="col">
					<div className="form-group">
						<label>Max:</label>
						<input type="number" value={props.field.max || ''} onChange={e => onMaxChanged(e.target.value)} />
					</div>
				</div>
			</div>
		</Fragment>
	);
}
