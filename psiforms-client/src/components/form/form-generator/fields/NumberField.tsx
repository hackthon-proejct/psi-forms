import { NumberFieldModel } from "../../FormModel";

export interface NumberFieldProps {
	fieldModel: NumberFieldModel;
}

export function NumberField(props: NumberFieldProps) {
	return (
		<div className="xform-field">
			<label>{props.fieldModel.label}{props.fieldModel.isRequired && ' *'}</label>
			<input type="number" />
		</div>
	);
}
