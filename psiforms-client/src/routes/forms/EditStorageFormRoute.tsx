import React, { useCallback, useState } from 'react';
import { Navigate, useParams } from 'react-router';

import { StorageForm } from '../../components/form/Form';
import { StorageFormEditor } from '../../components/form/form-editor/StorageFormEditor';
import { Loader, useLoader } from '../../components/layout/Loader';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { useWallet } from '../../components/wallet/WalletContext';
import { StorageClient } from '../../storage/StorageClient';
import { FormDto } from '../../storage/StorageModel';


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
					? await StorageClient.getForm(formId)
					: null
			};
		}, [formId, account]));

	async function save(form: StorageForm): Promise<boolean> {
		if (!account || !state.value?.form) {
			return false;
		}

		await StorageClient.updateForm(formId, form.name, form.description, form.fields);

		setNavigateTo('/forms');
		return true;
	}

	if (navigateTo) {
		return <Navigate to={navigateTo} />
	}
	return (
		<Loader state={state} element={(result => (
			<main className="page">
				<ConnectYourWallet requiredNetworkId={1} />
				{result?.form &&
					<StorageFormEditor name={result.form.name} description={result.form.description} fields={result.form.fields} onSave={save} />}
			</main>
		))} />
	);
}
