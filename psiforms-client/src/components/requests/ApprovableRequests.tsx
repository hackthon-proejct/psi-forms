import { Fragment, useState } from 'react';

import { HexFormatter } from '../../core/HexFormatter';
import { BlockchainContractClient } from '../../storage/BlockchainContractClient';
import { RequestStatus } from '../../storage/Model';
import { RequestDto } from '../../storage/StorageModel';
import { Loader, useLoader } from '../layout/Loader';
import { ConnectYourWallet } from '../wallet/ConnectYourWallet';
import { useWallet } from '../wallet/WalletContext';
import { RequestStatusInfo } from './RequestStatusInfo';

export interface ApprovableRequestsProps {
	title: string;
	loader: () => Promise<RequestDto[]>;
}

export function ApprovableRequests(props: ApprovableRequestsProps) {
	const wallet = useWallet();
	const account = wallet.tryGetAccount();

	const [statuses, setStatuses] = useState<(boolean | null)[]>();
	const state = useLoader<RequestDto[]>(props.loader);
	const hasAnyPending = state.value?.some(r => r.status === RequestStatus.pending);

	function setStatus(status: boolean | null, index: number) {
		if (!state.value) {
			return;
		}

		const newStatuses = statuses ? [...statuses] : state.value.map(() => null);
		newStatuses[index] = status;
		setStatuses(newStatuses);
	}

	async function save() {
		if (!account) {
			alert('Your wallet is not connected.');
			return;
		}
		if (!state.value || !statuses) {
			return;
		}

		const newStatuses = state.value
			.map((request, index) => {
				return {
					requestId: request.id,
					formId: request.formId,
					status: statuses[index]
				};
			})
			.filter(s => s.status !== null) as { requestId: string, formId: string, status: boolean }[];
		if (newStatuses.length < 1) {
			alert('Nothing changed!');
			return;
		}

		const uniqueFormIds = Array.from(new Set(newStatuses.map(s => s.formId)));
		if (uniqueFormIds.length > 1) {
			if (!window.confirm(`This operation requires ${uniqueFormIds.length} blockchain transactions. It's OK?`)) {
				return;
			}
		}

		for (let formId of uniqueFormIds) {
			const newFormStatuses = newStatuses.filter(s => s.formId === formId);
			try {
				const client = new BlockchainContractClient(account);

				await client.approveOrRejectRequests(formId,
					newFormStatuses.map(s => s.requestId),
					newFormStatuses.map(s => s.status));
			} catch (e) {
				console.error(e);
				alert('Error: ' + (e as Error).message);
				break;
			}
		}
	}

	return (
		<main className="page">
			<ConnectYourWallet />
			<Loader state={state} element={(ads => (
				<section className="section">
					<div className="section-header">
						<h2>{props.title}</h2>

						<div className="actions">
							<button className="btn btn-white" title="Refresh" onClick={state.reload}>
								<i className="ico ico-refresh-black" />
							</button>
						</div>
					</div>
					<div className="section-body">
						<table>
							<thead>
								<tr>
									<th>Status</th>
									<th>Request ID</th>
									<th>Form ID</th>
									<th>Created At</th>
									<th>New Status</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
							{ads.map((request, index) =>
								<tr key={index}>
									<td><RequestStatusInfo status={request.status} /></td>
									<td>{HexFormatter.formatHex(request.id)}</td>
									<td>{HexFormatter.formatHex(request.formId)}</td>
									<td>
										{request.createdAt.toLocaleString()}
									</td>
									<td className="text-center">
										{request.status === RequestStatus.pending &&
											<Fragment>
												{statuses && statuses[index] !== null &&
													<Fragment>
														{statuses && statuses[index]
															? <span className="status status-success">Approved</span>
															: <span className="status status-danger">Rejected</span>}
													</Fragment>}
											</Fragment>}
										{request.status !== RequestStatus.pending && <Fragment>-</Fragment>}
									</td>
									<td>
										{(request.status === RequestStatus.pending) &&
											<Fragment>
												<button className="btn btn-white" onClick={() => setStatus(true, index)}>Approve</button>
												{' '}
												<button className="btn btn-white" onClick={() => setStatus(false, index)}>Reject</button>
											</Fragment>}
									</td>
								</tr>)}
							</tbody>
						</table>

						{hasAnyPending &&
							<div className="list-submit">
								<button className="btn btn-black btn-large" onClick={save}>Save</button>
							</div>}
					</div>
				</section>
			))} />
		</main>
	);
}
