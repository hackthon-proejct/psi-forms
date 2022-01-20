import { Fragment } from 'react';

import { Field, NumberField } from '../../../../../storage/Model';

export interface NumberFieldEditorProps {
	field: NumberField;
	onChanged: (newField: Field) => void;
}

export function NumberFieldEditor(props: NumberFieldEditorProps) {

	function updateField(delta: Partial<NumberField>) {
		const newField = Object.assign({}, props.field, delta);
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
			<div className="form-group">
				<label>Label: *</label>
				<input type="text" value={props.field.label} onChange={e => updateField({ label: e.target.value })} />
			</div>
			<div className="form-group">
				<label>Is required:</label>
				<input type="checkbox" checked={props.field.isRequired} onChange={() => updateField({ isRequired: !props.field.isRequired })} />
			</div>
			<div className="form-group">
				<label>Min:</label>
				<input type="number" value={(props.field.min !== undefined) ? props.field.min : ''} onChange={e => onMinChanged(e.target.value)} />
			</div>
			<div className="form-group">
				<label>Max:</label>
				<input type="number" value={(props.field.max !== undefined) ? props.field.max : ''} onChange={e => onMaxChanged(e.target.value)} />
			</div>
		</Fragment>
	);
}
