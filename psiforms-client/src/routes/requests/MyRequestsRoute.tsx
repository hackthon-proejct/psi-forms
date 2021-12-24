import { Fragment, useCallback } from 'react';

import { Loader, useLoader } from '../../components/layout/Loader';
import { RequestStatusInfo } from '../../components/request/RequestStatusInfo';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { useWallet } from '../../components/wallet/WalletContext';
import { StorageClient } from '../../storage/StorageClient';
import { RequestDto } from '../../storage/StorageModel';

export function MyRequestsRoute() {

	const wallet = useWallet();
	const account = wallet.tryGetAccount();

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

	async function onRollbackClicked() {
		if (!account) {
			return;
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
								</tr>
							</thead>
							<tbody>
								{requests.map((request, index) =>
									<tr key={index}>
										<td>
											<RequestStatusInfo status={request.status} />
										</td>
										<td width="15%">
											{request.id}
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
