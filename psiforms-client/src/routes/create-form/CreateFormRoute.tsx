import { Fragment, useState } from 'react';

import { FormModelEditor } from '../../components/form/form-model-editor/FormModelEditor';
import { FormModel } from '../../components/form/FormModel';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { ApiClientV2 } from '../../core/ApiClientV2';

export function CreateFormRoute() {

	// const wallet = useWallet();
	const [formId, setFormId] = useState<string>();
	const form = true;
	// const [form, setForm] = useState<FormModel>();

	async function save(fm: FormModel): Promise<boolean> {
		//const account = wallet.getAccount();

		await ApiClientV2.createForm({
			name: fm.name,
			description: fm.description,
			itemPrice: fm.itemPrice.toString('hex'),
			approval: fm.approval,
			minQuantity: fm.minQuantity,
			maxQuantity: fm.maxQuantity,
			fields: JSON.stringify(fm.fields)
		});

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
