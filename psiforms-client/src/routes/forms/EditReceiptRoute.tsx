import { useCallback, useState } from 'react';
import { Navigate, useParams } from 'react-router';

import { PostReceipt, PreReceipt } from '../../components/form/Receipt';
import { ReceiptEditor } from '../../components/form/receipt-editor/ReceiptEditor';
import { AppPage } from '../../components/layout/AppPage';
import { Loader, useLoader } from '../../components/layout/Loader';
import { useWallet } from '../../components/wallet/WalletContext';
import { StorageClient } from '../../storage/StorageClient';

export function EditReceiptRoute() {

	const { id } = useParams();
	const formId = id as string;
	const wallet = useWallet();
	const account = wallet.tryGetAccount();

	const [navigateTo, setNavigateTo] = useState<string>();
	const state = useLoader(
		useCallback(async () => {
			if (!account) {
				throw new Error('Not logged in');
			}
			const preReceipt = await StorageClient.tryGetPreReceipt(formId);
			const postReceipt = await StorageClient.tryGetPostReceipt(formId);
			if (!postReceipt) {
				throw new Error('Cannot find the receipt');
			}
			return { preReceipt, postReceipt };
		}, [formId, account]));

	async function onSave(preReceipt: PreReceipt, postReceipt: PostReceipt): Promise<boolean> {
		if (state.value?.preReceipt) {
			await StorageClient.updatePreReceipt(formId, preReceipt.message);
		}
		await postReceipt.files.save();
		await StorageClient.updatePostReceipt(formId, postReceipt.message, postReceipt.files.toPointers(true));

		setNavigateTo('/forms');
		return true;
	}

	if (navigateTo) {
		return <Navigate to={navigateTo} />
	}
	return (
		<Loader state={state} element={(result => (
			<AppPage>
				<ReceiptEditor requireApproval={!!result.preReceipt} preMessage={result.preReceipt?.message}
					postMessage={result.postReceipt.message} postFiles={result.postReceipt.files} onSave={onSave} />
			</AppPage>
		))} />
	);
}
