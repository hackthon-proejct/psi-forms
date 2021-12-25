import { TextField } from '../../../../storage/Model';

export interface TextFieldGeneratorProps {
	field: TextField;
	value: string | undefined;
	onChanged: (value: string, isValid: boolean) => void;
}

export function TextFieldGenerator(props: TextFieldGeneratorProps) {

	function onChanged(value: string) {
		props.onChanged(value, !props.field.isRequired || value.length > 0);
	}

	return (
		<div className="xform-field">
			<label>{props.field.label}{props.field.isRequired && ' *'}</label>
			<input type="text" value={props.value || ''} onChange={e => onChanged(e.target.value)} />
		</div>
	);
}
