import { TextField } from '../../Form';

export interface TextFieldGeneratorProps {
	field: TextField;
}

export function TextFieldGenerator(props: TextFieldGeneratorProps) {
	return (
		<div className="xform-field">
			<label>{props.field.label}{props.field.isRequired && ' *'}</label>
			<input type="text" />
		</div>
	);
}
