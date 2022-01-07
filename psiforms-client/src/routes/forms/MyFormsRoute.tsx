import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { AppPage } from '../../components/layout/AppPage';
import { Loader, useLoader } from '../../components/layout/Loader';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { useWallet } from '../../components/wallet/WalletContext';
import { StorageClient } from '../../storage/StorageClient';
import { StorageFormDto } from '../../storage/StorageModel';

export function MyFormsRoute() {

	const wallet = useWallet();
	const account = wallet.tryGetAccount();

	const state = useLoader<StorageFormDto[]>(
		useCallback(async () => {
			if (account) {
				return await StorageClient.getCreatorForms(account.address);
			}
			return [];
		}, [account]));

	function onRefreshClicked() {
		state.reload();
	}

	return (
		<AppPage>
			<ConnectYourWallet />
			<Loader state={state} element={(forms => (
				<section className="section">
					<div className="section-header">
						<h2>My Forms</h2>

						<div className="actions">
							<Link to={`/create-form`} className="btn btn-white">Create Form</Link>
							{' '}
							<button className="btn btn-white" title="Refresh" onClick={onRefreshClicked}>
								<i className="ico ico-refresh-black" />
							</button>
						</div>
					</div>
					<div className="section-body">

						{forms.length === 0 &&
							<div className="no-content">No forms.</div>}
						{forms.length > 0 &&
							<div className="table">
								<table>
									<thead>
										<tr>
											<th>Status</th>
											<th>Name</th>
											<th>Editing</th>
											<th>Requests</th>
										</tr>
									</thead>
									<tbody>
										{forms.map(ab =>
											<tr key={ab.id}>
												<td width={'1%'}>
													{ab.isEnabled === null && <span className="status status-idle">Syncing</span>}
													{ab.isEnabled === true && <span className="status status-success">Enabled</span>}
													{ab.isEnabled === false && <span className="status status-danger">Disabled</span>}
												</td>
												<td>
													<Link to={`/forms/${ab.id}`}>{ab.name}</Link>
												</td>
												<td className="actions">
													<Link to={`/forms/${ab.id}/blockchain`} className="btn btn-small btn-white">Edit Earnings</Link>
													{' '}
													<Link to={`/forms/${ab.id}/storage`} className="btn btn-small btn-white">Edit Description</Link>
													{' '}
													<Link to={`/forms/${ab.id}/receipt`} className="btn btn-small btn-white">Edit Receipt</Link>
												</td>
												<td className="actions">
													<Link to={`/forms/${ab.id}/requests`} className="btn btn-small btn-white">Requests</Link>
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
