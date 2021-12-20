import { Fragment, useState } from 'react';

import { FormModelEditor } from '../../components/form/form-model-editor/FormModelEditor';
import { FormModel } from '../../components/form/FormModel';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { useWallet } from '../../components/wallet/WalletContext';
import { ApiClientV2 } from '../../core/ApiClientV2';
import { PsiFormsContract } from '../../core/PsiFormsContract';

export function CreateFormRoute() {

	const wallet = useWallet();
	const [formId, setFormId] = useState<string>();
	const form = true;

	async function save(fm: FormModel): Promise<boolean> {
		const account = wallet.getAccount();

		await ApiClientV2.createForm(fm.id, fm.name, fm.description, fm.fields);

		const contract = new PsiFormsContract(account);

		await contract.createForm(fm.id, true, fm.requireApproval, fm.minQuantity, fm.maxQuantity, fm.itemPrice);

		return false;
	}

	function onCreateNextClicked() {
		setFormId(undefined);
	}

	return (
		<Fragment>
			<ConnectYourWallet />
			{!formId && <FormModelEditor isEdit={false} saveHandler={save} />}
			{form &&
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
