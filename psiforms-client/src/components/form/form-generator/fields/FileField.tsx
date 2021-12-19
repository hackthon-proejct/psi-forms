import { FileFieldModel } from '../../FormModel';

export interface FileFieldProps {
	fieldModel: FileFieldModel;
}

export function FileField(props: FileFieldProps) {
	return (
		<div className="xform-field">
			<label>{props.fieldModel.label}{props.fieldModel.isRequired && ' *'}</label>
			<input type="file" />
		</div>
	);
}
