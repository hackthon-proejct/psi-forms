
export interface ApprovalFormGroupProps {
	isReadonly: boolean;
	requireApproval: boolean;
	onChange: (requireApproval: boolean) => void;
}

export function ApprovalFormGroup(props: ApprovalFormGroupProps) {
	return (
		<div className="form-section">
			<h4>Approval</h4>

			<div className="form-group">
				<label>
					<input type="radio" checked={!props.requireApproval} disabled={props.isReadonly} onChange={() => props.onChange(false)} />
					No approval, transfer money to me immediately
				</label>
				<label>
					<input type="radio" checked={props.requireApproval} disabled={props.isReadonly} onChange={() => props.onChange(true)} />
					Need approval, transfer money to me after approval
				</label>
			</div>
		</div>
	)
}
