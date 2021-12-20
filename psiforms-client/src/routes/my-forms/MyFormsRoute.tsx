import { Fragment, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Loader, useLoader } from '../../components/layout/Loader';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { useWallet } from '../../components/wallet/WalletContext';
import { ApiClientV2 } from '../../core/ApiClientV2';
import { FormDto } from '../../core/ApiModelV2';

export function MyFormsRoute() {

	const wallet = useWallet();
	const account = wallet.tryGetAccount();

	const state = useLoader<FormDto[]>(
		useCallback(async () => {
			if (account) {
				return await ApiClientV2.getForms(account.address);
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
										<td>
											{ab.name}
										</td>
										<td></td>
										<td></td>
										<td></td>
										<td>

										</td>
										<td className="actions">
											<Link to={`/my-forms/${ab.id}`} className="btn btn-white">Edit</Link>
											{' '}
											<Link to={`/submit-form/${ab.id}`} className="btn btn-white" title="Purchase Form">
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
