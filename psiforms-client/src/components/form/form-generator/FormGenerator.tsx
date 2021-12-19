import { FormModel } from '../FormModel';
import { UnitsConverter } from '../../../core/UnitsConverter';
import { Field } from './fields/Field';

export interface FormGeneratorProps {
	formModel: FormModel;
}

export function FormGenerator(props: FormGeneratorProps) {

	const fm = props.formModel;
	return (
		<div className="xform">
			<h4>{fm.name}</h4>
			<p>{fm.description}</p>

			<div className="xform-field">
				<label>E-mail:</label>
				<input type="text" />
			</div>

			<p>Item price: {UnitsConverter.toDecimal(fm.itemPrice, 18)}</p>

			{fm.maxQuantity > 1 &&
				<div className="xform-field">
					Quantity:
					<input type="number" defaultValue={fm.minQuantity} min={fm.maxQuantity} max={fm.maxQuantity} />
				</div>}

			{fm.fields.map((fm, index) =>
				<Field key={index} fieldModel={fm} />)}

			<div className="xform-footer">
				<button>
					{fm.approval ? 'Send for approval' : 'Send'}
				</button>
			</div>
		</div>
	);
}
