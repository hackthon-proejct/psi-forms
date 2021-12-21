import { Form } from '../Form';
import { UnitsConverter } from '../../../core/UnitsConverter';
import { FieldGenerator } from './fields/FieldGenerator';

export interface FormGeneratorProps {
	form: Form;
}

export function FormGenerator(props: FormGeneratorProps) {

	const form = props.form;
	return (
		<div className="xform">
			<h4>{form.name}</h4>
			<p>{form.description}</p>

			<div className="xform-field">
				<label>E-mail:</label>
				<input type="text" />
			</div>

			<p>Item price: {UnitsConverter.toDecimal(form.unitPrice, 18)}</p>

			{form.maxQuantity > 1 &&
				<div className="xform-field">
					Quantity:
					<input type="number" defaultValue={form.minQuantity} min={form.maxQuantity} max={form.maxQuantity} />
				</div>}

			{form.fields.map((fm, index) =>
				<FieldGenerator key={index} field={fm} />)}

			<div className="xform-footer">
				<button>
					{form.requireApproval ? 'Send for approval' : 'Send'}
				</button>
			</div>
		</div>
	);
}
