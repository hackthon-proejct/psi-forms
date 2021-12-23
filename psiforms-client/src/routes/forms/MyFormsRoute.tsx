import { Fragment, useCallback } from 'react';
import { Link } from 'react-router-dom';

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
		<Fragment>
			<ConnectYourWallet />
			<Loader state={state} element={(adBoxes => (
				<section className="list">
					<div className="header">
						<h2>My Forms</h2>

						<button className="btn btn-white" title="Reload" onClick={onRefreshClicked}>
							<i className="ico ico-reload-black" />
						</button>
					</div>

					<div className="table">
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{adBoxes.map(ab =>
									<tr key={ab.id}>
										<td>
											{ab.name}
										</td>
										<td>
											<Link to={`/forms/${ab.id}/requests`} className="btn btn-white">Requests</Link>
										</td>
										<td className="actions">
											<Link to={`/forms/${ab.id}/blockchain`} className="btn btn-white">Edit Earnings</Link>
											{' '}
											<Link to={`/forms/${ab.id}/storage`} className="btn btn-white">Edit Description</Link>
											{' '}
											<Link to={`/forms/${ab.id}`} className="btn btn-white" title="Submit Form">
												<i className="ico ico-purchase-black" />
											</Link>
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
