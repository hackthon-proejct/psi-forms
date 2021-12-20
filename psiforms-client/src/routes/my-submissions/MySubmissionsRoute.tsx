import { Fragment, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Loader, useLoader } from '../../components/layout/Loader';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { useWallet } from '../../components/wallet/WalletContext';
import { ApiClient } from '../../core/ApiClient';
import { AdStatus, AdSummaryDto, SyncStatus } from '../../core/ApiModel';
import { PsiFormsContract } from '../../core/PsiFormsContract';

export function MySubmissionsRoute() {

	const wallet = useWallet();
	const account = wallet.tryGetAccount();

	const state = useLoader<AdSummaryDto[]>(
		useCallback(async () => {
			if (account) {
				return await ApiClient.getAdSummaries(account.address);
			}
			return [];
		}, [account]));

	function onRefreshClicked() {
		state.reload();
	}

	async function onRollbackClicked(as: AdSummaryDto) {
		if (!account) {
			return;
		}

		const contract = new PsiFormsContract(account);
		try {
			const transactionHash = await contract.rollBackRequest(as.adBoxId, as.id);
			await ApiClient.confirmAdRolledBack(as.id, transactionHash);
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<Fragment>
			<ConnectYourWallet />
			<Loader state={state} element={(ads => (
				<section className="list">
					<div className="header">
						<h2>My Ads</h2>

						<button className="btn btn-white" title="Reload" onClick={onRefreshClicked}>
							<i className="ico ico-reload-black" />
						</button>
					</div>

					<div className="table">
						<table>
							<thead>
								<tr>
									<th>Status</th>
									<th>AdBox</th>
									<th>Display Time</th>
									<th>Created at</th>
									<th>Expired at</th>
									<th></th>
									<th>Clicks</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{ads.map(as =>
									<tr key={as.id}>
										<td width="1%">
											{as.syncStatus === SyncStatus.syncing && <span className="status status-idle">Syncing</span>}
											{as.syncStatus === SyncStatus.error && <span className="status status-danger">Sync Error</span>}
											{as.syncStatus === SyncStatus.synced &&
												<Fragment>
													{as.status === AdStatus.waitingForApproval && <span className="status status-idle">Waiting for Approval</span>}
													{as.status === AdStatus.approved && <span className="status status-success">Displaying</span>}
													{as.status === AdStatus.rejected && <span className="status status-danger">Rejected</span>}
													{as.status === AdStatus.expired && <span className="status status-neutral">Expired</span>}
													{as.status === AdStatus.rolledBack && <span className="status status-neutral">Rolled Back</span>}
												</Fragment>}
										</td>
										<td width="15%">
											{as.adBoxName}
										</td>
										<td>{as.quantity} hours</td>
										<td>
											{new Date(as.createdAt * 1000).toLocaleString()}
										</td>
										<td>
											{as.expiredAt && new Date(as.expiredAt * 1000).toLocaleString()}
										</td>
										<td>
											<a href={as.url} target="_blank" rel="noreferrer">
												<img src={as.imageUrl} alt="Ad" width="100" />
											</a>
										</td>
										<td>{as.clicks}</td>
										<td className="actions">
											<Link to={`/buy-ad/${as.adBoxId}`} className="btn main" title="Buy Another">
												<i className="ico ico-purchase-black" />
											</Link>
											{as.canRollback &&
												<Fragment>
													{' '}
													<button className="btn btn-white" onClick={() => onRollbackClicked(as)}>Roll Back</button>
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
