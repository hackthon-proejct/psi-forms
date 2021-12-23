import { Fragment, useCallback, useState } from 'react';
import { Navigate, useParams } from 'react-router';

import { Loader, useLoader } from '../../components/layout/Loader';
import { useWallet } from '../../components/wallet/WalletContext';

export function FormRequestsRoute() {
	const wallet = useWallet();
	const account = wallet.tryGetAccount();

	const { id } = useParams();
	const adBoxId = id as string;

	const [statuses, setStatuses] = useState<(boolean | null)[]>();
	const [navigateTo, setNavigateTo] = useState<string>();
	const state = useLoader<number[]>(
		useCallback(async () => {
			return [];
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

	}

	if (navigateTo) {
		return <Navigate to={navigateTo} />
	}

	return (
		<Loader state={state} element={(ads => (
			<section className="list">
				<div className="header">
					<h2>Form Requests</h2>
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
					{ads.map((_, index) =>
						<tr key={index}>
							<td>

							</td>
							<td>

							</td>
							<td className="text-center">

							</td>
							<td>
								{false &&
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
