
export interface BasicsFormGroupProps {
	isReadonly: boolean;
	name: string;
	description: string;
	onChange: (name: string, description: string) => void;
}

export function BasicsFormGroup(props: BasicsFormGroupProps) {

	function onNameChanged(text: string) {
		props.onChange(text, props.description);
	}

	function onDescriptionChanged(text: string) {
		props.onChange(props.name, text);
	}

	return (
		<div className="form-section">
			<div className="form-group">
				<label>Name *</label>
				<input type="text" value={props.name} readOnly={props.isReadonly} onChange={e => onNameChanged(e.target.value)} />
			</div>

			<div className="form-group">
				<label>Description *</label>
				<input type="text" value={props.description} readOnly={props.isReadonly} onChange={e => onDescriptionChanged(e.target.value)} />
			</div>
		</div>
	);
}
