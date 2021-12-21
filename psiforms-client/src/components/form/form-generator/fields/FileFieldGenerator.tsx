import { FileField } from '../../Form';

export interface FileFieldGeneratorProps {
	field: FileField;
}

export function FileFieldGenerator(props: FileFieldGeneratorProps) {
	return (
		<div className="xform-field">
			<label>{props.field.label}{props.field.isRequired && ' *'}</label>
			<input type="file" />
		</div>
	);
}
