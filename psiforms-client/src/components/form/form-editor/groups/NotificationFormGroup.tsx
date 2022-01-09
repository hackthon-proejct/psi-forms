
export interface NotificationFormGroupProps {
	isReadonly: boolean;
	email: string;
	onChange: (email: string) => void;
}

export function NotificationFormGroup(props: NotificationFormGroupProps) {

	function onEmailChanged(email: string) {
		props.onChange(email);
	}

	return (
		<div className="form-section">
			<div className="form-section-header">
				<h3>Notifications</h3>
			</div>
			<div className="form-section-body">
				<div className="form-group">
					<label>E-mail *</label>
					<input type="text" name="email" value={props.email} readOnly={props.isReadonly} onChange={e => onEmailChanged(e.target.value)} />
				</div>
			</div>
		</div>
	);
}
