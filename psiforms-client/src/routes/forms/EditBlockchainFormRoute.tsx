import React, { useCallback, useState } from 'react';
import { Navigate, useParams } from 'react-router';

import { EditBlockchainFormEditor } from '../../components/form/form-editor/EditBlockchainFormEditor';
import { BlockchainForm } from '../../components/form/Form';
import { Loader, useLoader } from '../../components/layout/Loader';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { useWallet } from '../../components/wallet/WalletContext';
import { ApiClientV2 } from '../../core/ApiClientV2';
import { FormDto } from '../../core/ApiModelV2';
import { PsiFormsContract } from '../../core/PsiFormsContract';

export function EditBlockchainFormRoute() {

	const { id } = useParams();
	const formId = id as string;
	const wallet = useWallet();
	const account = wallet.tryGetAccount();

	const [navigateTo, setNavigateTo] = useState<string>();
	const state = useLoader<{ form: FormDto | null }>(
		useCallback(async () => {
			return {
				form: account
					? await ApiClientV2.getForm(formId)
					: null
			};
		}, [formId, account]));

	async function save(form: BlockchainForm): Promise<boolean> {
		if (!account || !state.value?.form) {
			return false;
		}

		const contract = new PsiFormsContract(account);
		await contract.updateForm(state.value.form.id, form.isEnabled, form.minQuantity, form.maxQuantity, form.unitPrice);

		setNavigateTo('/my-forms');
		return true;
	}

	if (navigateTo) {
		return <Navigate to={navigateTo} />
	}
	return (
		<Loader state={state} element={(result => (
			<React.Fragment>
				<ConnectYourWallet requiredNetworkId={1} />
				{result?.form &&
					<EditBlockchainFormEditor isEnabled={result.form.isEnabled} unitPrice={result.form.unitPrice} minQuantity={result.form.minQuantity} maxQuantity={result.form.maxQuantity}
						onSave={save} />}
			</React.Fragment>
		))} />
	);
}
