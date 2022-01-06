import { useState } from 'react';
import { Navigate } from 'react-router';
import Web3 from 'web3';

import { Form } from '../../components/form/Form';
import { NewFormEditor } from '../../components/form/form-editor/NewFormEditor';
import { PostReceipt, PreReceipt } from '../../components/form/Receipt';
import { AppPage } from '../../components/layout/AppPage';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { useWallet } from '../../components/wallet/WalletContext';
import { BlockchainContractClient } from '../../storage/BlockchainContractClient';
import { StorageClient } from '../../storage/StorageClient';

export function CreateFormRoute() {

	const wallet = useWallet();
	const [navigateTo, setNavigateTo] = useState<string>();

	async function save(form: Form, preReceipt: PreReceipt, postReceipt: PostReceipt): Promise<boolean> {
		const account = wallet.getAccount();

		const formId = Web3.utils.randomHex(16);

		let formCreated = false;
		let preReceiptCreated = false;
		let postReceiptCreated = false;
		try {
			await StorageClient.createForm(account.address, formId, form.name, form.description, form.fields);
			formCreated = true;

			if (form.requireApproval) {
				await StorageClient.createPreReceipt(formId, preReceipt.message);
				preReceiptCreated = true;
			}

			await postReceipt.files.save();

			await StorageClient.createPostReceipt(formId, postReceipt.message, postReceipt.files.toPointers());
			postReceiptCreated = true;

			const contract = new BlockchainContractClient(account);
			await contract.createForm(formId, form.isEnabled, form.requireApproval, form.minQuantity, form.maxQuantity, form.unitPrice);
		} catch (e) {
			if (formCreated) {
				await StorageClient.deleteForm(formId);
			}
			if (preReceiptCreated) {
				await StorageClient.deletePreReceipt(formId);
			}
			if (postReceiptCreated) {
				await StorageClient.deletePostReceipt(formId);
			}
			throw e;
		}

		setNavigateTo('/forms');
		return true;
	}

	if (navigateTo) {
		return <Navigate to={navigateTo} />
	}
	return (
		<AppPage>
			<ConnectYourWallet />
			<NewFormEditor onSave={save} />
		</AppPage>
	);
}
