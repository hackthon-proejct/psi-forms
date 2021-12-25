import { Fragment } from 'react';
import Web3 from 'web3';

import { Form } from '../../components/form/Form';
import { NewFormEditor } from '../../components/form/form-editor/NewFormEditor';
import { PostReceipt, PreReceipt } from '../../components/form/Receipt';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { useWallet } from '../../components/wallet/WalletContext';
import { BlockchainContractClient } from '../../storage/BlockchainContractClient';
import { StorageClient } from '../../storage/StorageClient';

export function CreateFormRoute() {

	const wallet = useWallet();
	const createdForm = true;

	async function save(form: Form, preReceipt: PreReceipt, postReceipt: PostReceipt): Promise<boolean> {
		const account = wallet.getAccount();

		const formId = Web3.utils.randomHex(16);

		let formCreated = false;
		let preReceiptCreated = false;
		let postReceiptCreated = false;
		try {
			await StorageClient.createForm(account.address, formId, form.name, form.description, JSON.stringify(form.fields));
			formCreated = true;

			if (form.requireApproval) {
				await StorageClient.createPreReceipt(formId, preReceipt.message);
				preReceiptCreated = true;
			}

			await StorageClient.createPostReceipt(formId, postReceipt.message, postReceipt.files);
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
		return false;
	}

	function onCreateNextClicked() {
	}

	return (
		<Fragment>
			<ConnectYourWallet />
			<NewFormEditor onSave={save} />
			{createdForm &&
				<Fragment>
					<section className="form">
						<div className="form-submit">
							<button className="btn btn-black btn-large" onClick={onCreateNextClicked}>Create Next</button>
						</div>
					</section>
				</Fragment>}
		</Fragment>
	);
}
