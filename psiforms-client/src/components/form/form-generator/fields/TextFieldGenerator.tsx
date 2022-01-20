import { TextField } from '../../../../storage/Model';

export interface TextFieldGeneratorProps {
	field: TextField;
	value: string | undefined;
	onChanged: (value: string, isValid: boolean) => void;
}

export function TextFieldGenerator(props: TextFieldGeneratorProps) {

	function onChanged(newText: string) {
		props.onChanged(newText, !props.field.isRequired || newText.length > 0);
	}

	const text = props.value || '';
	return (
		<div className="web-form-group">
			<label>{props.field.label}:{props.field.isRequired && ' *'}</label>
			{props.field.multiline
				? <textarea value={text} onChange={e => onChanged(e.target.value)} />
				: <input type="text" value={text} onChange={e => onChanged(e.target.value)} />}
		</div>
	);
}
