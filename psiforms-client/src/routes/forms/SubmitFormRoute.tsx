import { Fragment, useCallback, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import Web3 from 'web3';

import { Form } from '../../components/form/Form';
import { FormData } from '../../components/form/form-generator/FormData';
import { FormGenerator } from '../../components/form/form-generator/FormGenerator';
import { Loader, useLoader } from '../../components/layout/Loader';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { useWallet } from '../../components/wallet/WalletContext';
import { ApiClientV2 } from '../../core/ApiClientV2';
import { FormDto } from '../../core/ApiModelV2';

function convertToForm(dto: FormDto): Form {
	return {
		name: dto.name,
		description: dto.description,
		id: dto.id,
		isEnabled: dto.isEnabled,
		fields: JSON.parse(dto.fields),
		maxQuantity: dto.maxQuantity,
		minQuantity: dto.minQuantity,
		requireApproval: dto.requireApproval,
		unitPrice: Web3.utils.toBN(dto.unitPrice)
	};
}

export function SubmitFormRoute() {
	const { id } = useParams();
	const formId = id as string;
	const wallet = useWallet();
	const account = wallet.tryGetAccount();

	const [navigateTo, setNavigateTo] = useState<string>();

	const state = useLoader<Form>(
		useCallback(async () => {
			const dto = await ApiClientV2.getForm(formId);
			return convertToForm(dto);
		}, [formId]));

	async function save(_: FormData) {
		if (!account) {
			return;
		}

		setNavigateTo('/my-requests');
	}

	if (navigateTo) {
		return <Navigate to={navigateTo} />
	}
	return (
		<Loader state={state} element={(form =>
			<Fragment>
				<ConnectYourWallet requiredNetworkId={1} />
				<FormGenerator form={form} onSave={save} />
			</Fragment>)} />
	);
}
