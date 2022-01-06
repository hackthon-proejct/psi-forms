import { Fragment, useCallback } from 'react';

import { AppPage } from '../../components/layout/AppPage';
import { Loader, useLoader } from '../../components/layout/Loader';
import { RequestStatusInfo } from '../../components/requests/RequestStatusInfo';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { useWallet } from '../../components/wallet/WalletContext';
import { HexFormatter } from '../../core/HexFormatter';
import { BlockchainContractClient } from '../../storage/BlockchainContractClient';
import { RequestStatus } from '../../storage/Model';
import { StorageClient } from '../../storage/StorageClient';
import { RequestDto } from '../../storage/StorageModel';

export function MyRequestsRoute() {

	const wallet = useWallet();
	const account = wallet.tryGetAccount();
	const rollBackLimit = Date.now() - (60 * 60 * 24 * 1000);

	const state = useLoader<RequestDto[]>(
		useCallback(async () => {
			if (account) {
				return await StorageClient.getSenderRequests(account.address);
			}
			return [];
		}, [account]));

	function onRefreshClicked() {
		state.reload();
	}

	function canRollback(request: RequestDto): boolean {
		return (
			request.status === RequestStatus.pending &&
			request.createdAt.getTime() < rollBackLimit
		);
	}

	async function onRollbackClicked(request: RequestDto) {
		if (!account) {
			return;
		}

		try {
			const client = new BlockchainContractClient(account);
			await client.rollBackRequest(request.formId, request.id);
		} catch (e) {
			console.error(e);
			alert('Error: ' + (e as Error).message);
		}
	}

	return (
		<AppPage>
			<ConnectYourWallet />
			<Loader state={state} element={(requests => (
				<section className="section">
					<div className="section-header">
						<h2>My Requests</h2>

						<div className="actions">
							<button className="btn btn-white" title="Refresh" onClick={onRefreshClicked}>
								<i className="ico ico-refresh-black" />
							</button>
						</div>
					</div>
					<div className="section-body">

						<div className="request-list">
							<table>
								<thead>
									<tr>
										<th>Status</th>
										<th>Id</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{requests.map((request, index) =>
										<tr key={index}>
											<td>
												<RequestStatusInfo status={request.status} />
											</td>
											<td>
												{HexFormatter.formatHex(request.id)}
											</td>
											<td>
												{canRollback(request) &&
													<Fragment>
														<button className="btn btn-white" onClick={() => onRollbackClicked(request)}>Roll Back</button>
													</Fragment>}
											</td>
										</tr>)}
								</tbody>
							</table>
						</div>

					</div>
				</section>
			))} />
		</AppPage>
	);
}
