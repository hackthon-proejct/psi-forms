import React, { useCallback, useState } from 'react';
import { Navigate, useParams } from 'react-router';

import { StorageForm } from '../../components/form/Form';
import { EditStorageFormEditor } from '../../components/form/form-editor/EditStorageFormEditor';
import { Loader, useLoader } from '../../components/layout/Loader';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { useWallet } from '../../components/wallet/WalletContext';
import { ApiClientV2 } from '../../core/ApiClientV2';
import { FormDto } from '../../core/ApiModelV2';

export function EditStorageFormRoute() {

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

	async function save(form: StorageForm): Promise<boolean> {
		if (!account || !state.value?.form) {
			return false;
		}

		await ApiClientV2.updateForm(formId, form.name, form.description, JSON.stringify(form.fields));

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
					<EditStorageFormEditor name={result.form.name} description={result.form.description} fields={result.form.fields} onSave={save} />}
			</React.Fragment>
		))} />
	);
}
