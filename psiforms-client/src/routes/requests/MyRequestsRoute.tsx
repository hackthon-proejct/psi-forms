import { Fragment, useCallback } from 'react';

import { Loader, useLoader } from '../../components/layout/Loader';
import { RequestStatusInfo } from '../../components/request/RequestStatusInfo';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { useWallet } from '../../components/wallet/WalletContext';
import { HexFormatter } from '../../core/HexFormatter';
import { BlockchainContractClient } from '../../storage/BlockchainContractClient';
import { StorageClient } from '../../storage/StorageClient';
import { RequestDto, RequestStatus } from '../../storage/StorageModel';

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
			request.status === RequestStatus.waitingForApproval &&
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
		<Fragment>
			<ConnectYourWallet />
			<Loader state={state} element={(requests => (
				<section className="list">
					<div className="header">
						<h2>My Requests</h2>

						<button className="btn btn-white" title="Reload" onClick={onRefreshClicked}>
							<i className="ico ico-reload-black" />
						</button>
					</div>

					<div className="table">
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
				</section>
			))} />
		</Fragment>
	);
}
