
export interface ApprovalFormGroupProps {
	isReadonly: boolean;
	requireApproval: boolean;
	onChange: (requireApproval: boolean) => void;
}

export function ApprovalFormGroup(props: ApprovalFormGroupProps) {
	return (
		<div className="form-section">
			<div className="form-section-header">
				<h3>Approval</h3>
			</div>
			<div className="form-section-body">
				<div className="form-group">
					<label className="checkbox">
						<input type="radio" checked={!props.requireApproval} disabled={props.isReadonly} onChange={() => props.onChange(false)} />
						{' '}No approval, transfer money to me immediately
					</label>
					<label className="checkbox">
						<input type="radio" checked={props.requireApproval} disabled={props.isReadonly} onChange={() => props.onChange(true)} />
						{' '}Need approval, transfer money to me after approval
					</label>
				</div>
			</div>
		</div>
	)
}
