import { useCallback } from 'react';

import { AppPage } from '../../components/layout/AppPage';
import { Loader, useLoader } from '../../components/layout/Loader';
import { EditCreatorProfile } from '../../components/profiles/EditCreatorProfile';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { useWallet } from '../../components/wallet/WalletContext';
import { StorageClient } from '../../storage/StorageClient';

export function EditCreatorProfileRoute() {

	const wallet = useWallet();
	const account = wallet.tryGetAccount();

	const state = useLoader(
		useCallback(async () => {
			if (!account) {
				throw new Error('Wallet is not connected');
			}
			return await StorageClient.tryGetCreatorProfile(account.address)
				|| { email: '' };
		}, [account]));

	async function save(email: string): Promise<boolean> {
		if (!account) {
			throw new Error('Wallet is not connected');
		}

		await StorageClient.createOrUpdateCreatorProfile(account.address, email);
		return false;
	}

	return (
		<AppPage>
			<ConnectYourWallet />
			<Loader state={state} element={(profile =>
				<EditCreatorProfile email={profile.email} onSave={save} />
			)} />
		</AppPage>
	);
}
