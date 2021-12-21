import BN from 'bn.js';
import { useState } from 'react';

import { validateEmail } from '../../../core/EmailValidator';
import { UnitsConverter } from '../../../core/UnitsConverter';
import { Form } from '../Form';
import { FieldGenerator } from './fields/FieldGenerator';
import { FormData } from './FormData';

export interface FormGeneratorProps {
	form: Form;
	onSave?: (data: FormData) => Promise<void>;
}

interface FieldState {
	value: string | null;
	isValid: boolean;
}

export function FormGenerator(props: FormGeneratorProps) {

	const [error, setError] = useState<string>();
	const [email, setEmail] = useState<string>(() => '');
	const [quantityText, setQuantityText] = useState<string>(() => `${props.form.minQuantity}`);
	const [fieldStates, setFieldStates] = useState<FieldState[]>(() => props.form.fields.map(f => {
		return {
			value: null,
			isValid: !f.isRequired
		};
	}));
	const quantity = parseInt(quantityText, 10);
	const totalPrice = props.form.unitPrice
		.mul(new BN(isNaN(quantity) ? 1 : Math.abs(quantity)));

	function onFieldChanged(value: string | null, isValid: boolean, index: number) {
		const values = [...fieldStates];
		values[index] = { value, isValid };
		setFieldStates(values);
	}

	async function onSubmit() {
		if (!email || !validateEmail(email)) {
			setError('E-mail is invalid');
			return;
		}
		if (isNaN(quantity) || quantity < props.form.minQuantity || quantity > props.form.maxQuantity) {
			setError('Quantity is invalid');
			return;
		}
		const firstInvalidFieldIndex = fieldStates.findIndex(s => !s.isValid)
		if (firstInvalidFieldIndex >= 0) {
			const invalidField = props.form.fields[firstInvalidFieldIndex];
			setError(`${invalidField.label} is invalid`);
			return;
		}
		if (!props.onSave) {
			setError('This is preview form only.');
			return;
		}

		const data: FormData = {
			email,
			quantity,
			fields: fieldStates.map((state, index) => {
				const field = props.form.fields[index];
				return {
					type: field.type,
					label: field.label,
					value: state.value as string
				};
			})
		};

		setError(undefined);
		await props.onSave(data);
	}

	return (
		<div className="form xform">
			<h4>{props.form.name}</h4>
			<p>{props.form.description}</p>

			<div className="xform-field">
				<label>E-mail: *</label>
				<input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
			</div>

			{props.form.maxQuantity > 1 &&
				<div className="xform-field">
					<label>Quantity: *</label>
					<input type="number" value={quantityText} min={props.form.minQuantity} max={props.form.maxQuantity} step={1} onChange={e => setQuantityText(e.target.value)} />
				</div>}

			<p>Total price: {UnitsConverter.toDecimalETH(totalPrice)} AVAX</p>

			{props.form.fields.map((fm, index) =>
				<FieldGenerator key={index} field={fm} value={fieldStates[index].value} onChanged={(v, iv) => onFieldChanged(v, iv, index)} />)}

			{error && <p className="form-error">Error: {error}</p>}

			<div className="xform-footer">
				<button onClick={onSubmit}>
					{props.form.requireApproval ? 'Send for approval' : 'Send'}
				</button>
			</div>
		</div>
	);
}
