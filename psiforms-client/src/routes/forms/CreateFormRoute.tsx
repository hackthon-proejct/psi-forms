import { Fragment, useState } from 'react';

import { Form } from '../../components/form/Form';
import { NewFormEditor } from '../../components/form/form-editor/NewFormEditor';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { useWallet } from '../../components/wallet/WalletContext';
import { ApiClientV2 } from '../../core/ApiClientV2';
import { PsiFormsContract } from '../../core/PsiFormsContract';

export function CreateFormRoute() {

	const wallet = useWallet();
	const [formId, setFormId] = useState<string>();
	const createdForm = true;

	async function save(form: Form): Promise<boolean> {
		const account = wallet.getAccount();

		await ApiClientV2.createForm(account.address, form.id, form.name, form.description, JSON.stringify(form.fields));

		const contract = new PsiFormsContract(account);
		await contract.createForm(form.id, form.isEnabled, form.requireApproval, form.minQuantity, form.maxQuantity, form.unitPrice);
		return false;
	}

	function onCreateNextClicked() {
		setFormId(undefined);
	}

	return (
		<Fragment>
			<ConnectYourWallet />
			{!formId && <NewFormEditor onSave={save} />}
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
