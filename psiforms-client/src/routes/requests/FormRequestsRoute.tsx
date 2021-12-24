import { Fragment, useCallback, useState } from 'react';
import { useParams } from 'react-router';

import { Loader, useLoader } from '../../components/layout/Loader';
import { RequestStatusInfo } from '../../components/request/RequestStatusInfo';
import { useWallet } from '../../components/wallet/WalletContext';
import { EthFormatter } from '../../core/EthFormatter';
import { BlockchainContractClient } from '../../storage/BlockchainContractClient';
import { StorageClient } from '../../storage/StorageClient';
import { RequestDto, RequestStatus } from '../../storage/StorageModel';

export function FormRequestsRoute() {
	const wallet = useWallet();
	const account = wallet.tryGetAccount();

	const { id } = useParams();
	const formId = id as string;

	const [statuses, setStatuses] = useState<(boolean | null)[]>();
	const state = useLoader<RequestDto[]>(
		useCallback(async () => {
			return StorageClient.getFormRequests(formId);
		}, [formId]));

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
					status: statuses[index]
				};
			})
			.filter(s => s.status !== null) as { requestId: string, status: boolean }[];
		if (newStatuses.length < 1) {
			alert('Nothing changed!');
			return;
		}

		try {
			const client = new BlockchainContractClient(account);

			await client.approveOrRejectRequests(formId,
				newStatuses.map(s => s.requestId),
				newStatuses.map(s => s.status));
		} catch (e) {
			console.error(e);
			alert('Error: ' + (e as Error).message);
		}
	}

	return (
		<Loader state={state} element={(ads => (
			<section className="list">
				<div className="header">
					<h2>Form Requests</h2>

					<button className="btn btn-white" title="Reload" onClick={state.reload}>
						<i className="ico ico-reload-black" />
					</button>
				</div>

				<table>
					<thead>
						<tr>
							<th>Status</th>
							<th>Created At</th>
							<th>ID</th>
							<th>New Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
					{ads.map((request, index) =>
						<tr key={index}>
							<td>
								<RequestStatusInfo status={request.status} />
							</td>
							<td>
								{request.createdAt.toLocaleString()}
							</td>
							<td>
								{EthFormatter.formatAddress(request.id)}
							</td>
							<td className="text-center">
								{request.status === RequestStatus.waitingForApproval &&
									<Fragment>
										{statuses && statuses[index] !== null &&
											<Fragment>
												{statuses && statuses[index]
													? <span className="status status-success">Approved</span>
													: <span className="status status-danger">Rejected</span>}
											</Fragment>}
									</Fragment>}
								{request.status !== RequestStatus.waitingForApproval && <Fragment>-</Fragment>}
							</td>
							<td>
								{(request.status === RequestStatus.waitingForApproval) &&
									<Fragment>
										<button className="btn btn-white" onClick={() => setStatus(true, index)}>Approve</button>
										{' '}
										<button className="btn btn-white" onClick={() => setStatus(false, index)}>Reject</button>
									</Fragment>}
							</td>
						</tr>)}
					</tbody>
				</table>

				<div className="list-submit">
					<button className="btn btn-black btn-large" onClick={save}>Save</button>
				</div>
			</section>
		))} />
	);
}
