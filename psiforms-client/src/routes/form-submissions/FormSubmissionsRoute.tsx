import { Fragment, useCallback, useState } from 'react';
import { Navigate, useParams } from 'react-router';

import { Loader, useLoader } from '../../components/layout/Loader';
import { useWallet } from '../../components/wallet/WalletContext';
import { ApiClient } from '../../core/ApiClient';
import { AdDto, SyncStatus } from '../../core/ApiModel';
import { FormsContract } from '../../core/FormsContract';
import { EthFormatter } from '../../core/EthFormatter';

export function FormSubmissionsRoute() {
	const wallet = useWallet();
	const account = wallet.isConnected()
		? wallet.getAccount()
		: null;

	const { id } = useParams();
	const adBoxId = id as string;

	const [statuses, setStatuses] = useState<(boolean | null)[]>();
	const [navigateTo, setNavigateTo] = useState<string>();
	const state = useLoader<AdDto[]>(
		useCallback(async () => {
			return await ApiClient.getAdsToReview(adBoxId);
		}, [adBoxId]));

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
		if (!state.value) {
			alert('No ads.');
			return;
		}
		if (!statuses || statuses.find(s => s === null)) {
			alert('Please mark all ads!');
			return;
		}

		const contract = new FormsContract(account);
		try {
			const transactionHash = await contract.approveOrRejectAds(adBoxId, state.value.map(a => a.id), statuses as boolean[]);

			for (let ad of state.value) {
				await ApiClient.confirmAdApprovedOrRejected(ad.id, transactionHash);
			}

			setNavigateTo('/adboxes');
		} catch (e) {
			console.error(e);
		}
	}

	if (navigateTo) {
		return <Navigate to={navigateTo} />
	}

	return (
		<Loader state={state} element={(ads => (
			<section className="list">
				<div className="header">
					<h2>Review Ads</h2>
				</div>

				<table>
					<thead>
						<tr>
							<th>Ad</th>
							<th>Income Gross</th>
							<th>New Status</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
					{ads.map((as, index) =>
						<tr key={as.id}>
							<td>
								<a href={as.imageUrl} target="_blank" rel="noreferrer">
									<img src={as.imageUrl} alt="Ad" width="400" />
								</a><br />
								<code>{as.url}</code>
							</td>
							<td>
								{account && as.value &&
									<Fragment>
										{EthFormatter.formatAmount(as.value, account.network.ethDecimals, account.network.ethSymbol)}
										{' for '}
									</Fragment>}
								{as.quantity} hours
							</td>
							<td className="text-center">
								{as.syncStatus === SyncStatus.syncing && <span className="status status-idle">Syncing</span>}
								{as.syncStatus === SyncStatus.error && <span className="status status-error">Sync error</span>}
								{(as.syncStatus === SyncStatus.synced && statuses && statuses[index] !== null) &&
									<Fragment>
										{statuses[index]
											? <span className="status status-success">Approved</span>
											: <span className="status status-danger">Rejected</span>}
									</Fragment>}
							</td>
							<td>
								{as.syncStatus === SyncStatus.synced &&
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
