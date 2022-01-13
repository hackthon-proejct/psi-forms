import { useCallback, useState } from 'react';
import { Navigate } from 'react-router';
import Web3 from 'web3';

import { Form, Notifications } from '../../components/form/Form';
import { NewFormEditor } from '../../components/form/form-editor/NewFormEditor';
import { PostReceipt, PreReceipt } from '../../components/form/Receipt';
import { AppPage } from '../../components/layout/AppPage';
import { Loader, useLoader } from '../../components/layout/Loader';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { useWallet } from '../../components/wallet/WalletContext';
import { BlockchainContractClient } from '../../storage/BlockchainContractClient';
import { StorageClient } from '../../storage/StorageClient';

export function CreateFormRoute() {

	const wallet = useWallet();
	const account = wallet.tryGetAccount();
	const [navigateTo, setNavigateTo] = useState<string>();

	const state = useLoader<{ collectNotifications: boolean }>(
		useCallback(async () => {
			return {
				collectNotifications: account
					? (!(await StorageClient.tryGetCreatorProfile(account.address))?.email)
					: true
			};
		}, [account]));

	async function save(form: Form, notifications: Notifications | null, preReceipt: PreReceipt, postReceipt: PostReceipt): Promise<boolean> {
		if (!account) {
			throw new Error('Wallet is not connected');
		}

		const formId = Web3.utils.randomHex(16);

		let formCreated = false;
		let preReceiptCreated = false;
		let postReceiptCreated = false;
		try {
			if (notifications) {
				await StorageClient.createOrUpdateCreatorProfile(account.address, notifications.email);
			}

			await StorageClient.createForm(account.address, formId, form.name, form.description, form.fields);
			formCreated = true;

			if (form.requireApproval) {
				await StorageClient.createPreReceipt(formId, preReceipt.message);
				preReceiptCreated = true;
			}

			await postReceipt.files.save();

			await StorageClient.createPostReceipt(formId, postReceipt.message, postReceipt.files.toPointers(true));
			postReceiptCreated = true;

			const contract = new BlockchainContractClient(account);
			await contract.createForm(formId, form.isEnabled, form.requireApproval, form.minQuantity, form.maxQuantity, form.unitPrice);
		} catch (e) {
			if (formCreated) {
				try {
					await StorageClient.deleteForm(formId);
				} catch (er) {
					console.error(er);
				}
			}
			if (preReceiptCreated) {
				try {
					await StorageClient.deletePreReceipt(formId);
				} catch (er) {
					console.error(er);
				}
			}
			if (postReceiptCreated) {
				try {
					await StorageClient.deletePostReceipt(formId);
				} catch (er) {
					console.error(er);
				}
			}
			throw e;
		}

		setNavigateTo('/forms');
		return true;
	}

	if (navigateTo) {
		return <Navigate to={navigateTo} />;
	}
	return (
		<AppPage>
			<ConnectYourWallet requiredNetworkId={1} />
			<Loader state={state} element={(result => (
				<NewFormEditor collectNotifications={result.collectNotifications} onSave={save} />
			))} />
		</AppPage>
	);
}
