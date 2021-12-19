import { Fragment, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Loader, useLoader } from '../../components/layout/Loader';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { useWallet } from '../../components/wallet/WalletContext';
import { ApiClient } from '../../core/ApiClient';
import { AdBoxSummaryDto, SyncStatus } from '../../core/ApiModel';
import { EthFormatter } from '../../core/EthFormatter';
import { getNetworkInfo } from '../../core/NetworkInfo';

export function MyFormsRoute() {

	const wallet = useWallet();
	const account = wallet.tryGetAccount();

	const state = useLoader<AdBoxSummaryDto[]>(
		useCallback(async () => {
			if (account) {
				return await ApiClient.getAdBoxSummaries(account.address);
			}
			return [];
		}, [account]));

	function onRefreshClicked() {
		state.reload();
	}

	return (
		<Fragment>
			<ConnectYourWallet />
			<Loader state={state} element={(adBoxes => (
				<section className="list">
					<div className="header">
						<h2>My AdBoxes</h2>

						<button className="btn btn-white" title="Reload" onClick={onRefreshClicked}>
							<i className="ico ico-reload-black" />
						</button>
					</div>

					<div className="table">
						<table>
							<thead>
								<tr>
									<th>Status</th>
									<th>Name</th>
									<th>Type</th>
									<th>Income Gross</th>
									<th>Active Ads</th>
									<th>Waiting Ads</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{adBoxes.map(ab =>
									<tr key={ab.id}>
										<td width="1%">
											{ab.syncStatus === SyncStatus.syncing && <span className="status status-idle">Syncing</span>}
											{ab.syncStatus === SyncStatus.error && <span className="status status-danger">Sync Error</span>}
											{ab.syncStatus === SyncStatus.synced &&
												<Fragment>
													{!ab.isBanned && ab.isEnabled && <span className="status status-success">Enabled</span>}
													{!ab.isBanned && !ab.isEnabled && <span className="status status-neutral">Disabled</span>}
													{ab.isBanned && <span className="status status-danger">Banned</span>}
												</Fragment>}
										</td>
										<td>
											{ab.name}
											{account && ab.networkId !== account.network.id &&
												<Fragment>
													{' '}(network: {getNetworkInfo(ab.networkId).name})
												</Fragment>}
										</td>
										<td></td>
										<td>{ab.income && account &&
											<Fragment>
												{EthFormatter.formatAmount(ab.income, account.network.ethDecimals, account.network.ethSymbol)}
											</Fragment>}</td>
										<td>{ab.activeAds}</td>
										<td>
											{ab.waitingAds > 0 &&
												<Fragment>
													{ab.waitingAds}
													{' '}
													<Link to={`/adboxes/${ab.id}/review`} className="btn btn-black">Review</Link>
												</Fragment>}
											{ab.waitingAds === 0 && '-'}
										</td>
										<td className="actions">
											{(ab.syncStatus === SyncStatus.synced) &&
												<Fragment>
													<Link to={`/adboxes/${ab.id}`} className="btn btn-white">Edit</Link>
													{' '}
													<Link to={`/buy-ad/${ab.id}`} className="btn btn-white" title="Purchase Form">
														<i className="ico ico-purchase-black" />
													</Link>
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
