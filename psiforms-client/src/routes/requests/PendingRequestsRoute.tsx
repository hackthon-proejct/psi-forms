import { useCallback } from 'react';

import { ApprovableRequests } from '../../components/requests/ApprovableRequests';
import { useWallet } from '../../components/wallet/WalletContext';
import { StorageClient } from '../../storage/StorageClient';

export function PendingRequestsRoute() {

	const wallet = useWallet();
	const account = wallet.tryGetAccount();

	const loader = useCallback(async () => {
		return account
			? StorageClient.getCreatorPendingRequests(account.address)
			: [];
	}, [account]);

	return <ApprovableRequests title="Pending Requests" loader={loader} />;
}
