import { TextFieldModel } from '../../FormModel';

export interface TextFieldProps {
	fieldModel: TextFieldModel;
}

export function TextField(props: TextFieldProps) {
	return (
		<div className="xform-field">
			<label>{props.fieldModel.label}{props.fieldModel.isRequired && ' *'}</label>
			<input type="text" />
		</div>
	);
}
