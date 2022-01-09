import { Fragment, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { AppPage } from '../../components/layout/AppPage';
import { Loader, useLoader } from '../../components/layout/Loader';
import { RequestStatusInfo } from '../../components/requests/RequestStatusInfo';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { useWallet } from '../../components/wallet/WalletContext';
import { HexFormatter } from '../../core/HexFormatter';
import { UnitsConverter } from '../../core/UnitsConverter';
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
						{requests.length === 0 &&
							<div className="no-content">No requests.</div>}
						{requests.length > 0 &&
							<div className="table">
								<table>
									<thead>
										<tr>
											<th>Status</th>
											<th>ID</th>
											<th>Value</th>
											<th>Created</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
									{requests.map((request, index) =>
										<tr key={index}>
											<td width={'1%'}>
												<RequestStatusInfo status={request.status} />
											</td>
											<td>{HexFormatter.format(request.id)}</td>
											<td>
												{request.value &&
													<Fragment>{UnitsConverter.toDecimalETH(request.value)} AVAX</Fragment>}
											</td>
											<td>
												{request.createdAt.toLocaleString()}
											</td>
											<td className="actions">
												<Link to={'/forms/' + request.formId} className="btn btn-small btn-white">Form</Link>
												{request.status === RequestStatus.approved &&
													<Fragment>
														{' '}
														<Link to={`/forms/${request.formId}/post-receipt`} className="btn btn-small btn-black">Receipt</Link>
													</Fragment>}
												{canRollback(request) &&
													<Fragment>
														{' '}
														<button className="btn btn-small btn-white" onClick={() => onRollbackClicked(request)}>Roll Back</button>
													</Fragment>}
											</td>
										</tr>)}
									</tbody>
								</table>
							</div>}

					</div>
				</section>
			))} />
		</AppPage>
	);
}
