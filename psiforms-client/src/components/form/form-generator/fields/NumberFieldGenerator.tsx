import { NumberField } from "../../Form";

export interface NumberFieldGeneratorProps {
	field: NumberField;
}

export function NumberFieldGenerator(props: NumberFieldGeneratorProps) {
	return (
		<div className="xform-field">
			<label>{props.field.label}{props.field.isRequired && ' *'}</label>
			<input type="number" />
		</div>
	);
}
