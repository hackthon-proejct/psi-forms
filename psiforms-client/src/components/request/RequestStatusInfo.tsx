import { RequestStatus } from '../../storage/Model';

export interface RequestStatusInfoProps {
	status: RequestStatus;
}

export function RequestStatusInfo(props: RequestStatusInfoProps) {
	switch (props.status) {
		case RequestStatus.waitingForApproval:
			return <span className="status status-idle">Waiting for approval</span>;
		case RequestStatus.approved:
			return <span className="status status-success">Approved</span>;
		case RequestStatus.rejected:
			return <span className="status status-danger">Rejected</span>;
		case RequestStatus.rolledBack:
			return <span className="status status-danger">Rolled Back</span>;
		default:
			throw new Error('Not supported status');
	}
}
