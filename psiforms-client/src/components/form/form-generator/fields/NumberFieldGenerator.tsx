import { NumberField } from '../../../../storage/Model';

export interface NumberFieldGeneratorProps {
	field: NumberField;
	value: string | undefined;
	onChanged: (value: string | undefined, isValid: boolean) => void;
}

export function NumberFieldGenerator(props: NumberFieldGeneratorProps) {

	function onChanged(text: string) {
			const value = parseInt(text, 10);
			const isInt = !isNaN(value);
			const isValid = isInt &&
				(props.field.min === undefined || value >= props.field.min) &&
				(props.field.max === undefined || value <= props.field.max);

			props.onChanged(text, props.field.isRequired ? isValid : isInt);
	}

	return (
		<div className="xform-field">
			<label>{props.field.label}{props.field.isRequired && ' *'}</label>
			<input type="number" value={props.value || ''} min={props.field.min} max={props.field.max} onChange={e => onChanged(e.target.value)} />
		</div>
	);
}
