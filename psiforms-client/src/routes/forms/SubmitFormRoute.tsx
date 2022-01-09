import BN from 'bn.js';
import { Fragment, useCallback, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import Web3 from 'web3';

import { Form } from '../../components/form/Form';
import { FormData } from '../../components/form/form-generator/FormData';
import { FormGenerator } from '../../components/form/form-generator/FormGenerator';
import { Loader, useLoader } from '../../components/layout/Loader';
import { Meta } from '../../components/layout/Meta';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { useWallet } from '../../components/wallet/WalletContext';
import { RequestHasher } from '../../services/hashes/RequestHasher';
import { BlockchainContractClient } from '../../storage/BlockchainContractClient';
import { FieldData } from '../../storage/Model';
import { StorageClient } from '../../storage/StorageClient';
import { FormDto } from '../../storage/StorageModel';

function convertToForm(dto: FormDto): Form {
	return {
		name: dto.name,
		description: dto.description,
		isEnabled: dto.isEnabled,
		fields: dto.fields,
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

	const state = useLoader(
		useCallback(async () => {
			const dto = await StorageClient.getForm(formId);
			if (!dto.isEnabled) {
				throw new Error('This form is disabled');
			}
			return convertToForm(dto);
		}, [formId]));

	async function save(data: FormData) {
		if (!account || !state.value) {
			return;
		}

		const requestId = Web3.utils.randomHex(16);
		const totalPrice = state.value.unitPrice.mul(new BN(data.quantity));

		let requestCreated = false;
		try {
			const fields: FieldData[] = [];
			for (let field of data.fields) {
				if (field.files) {
					await field.files.save();
					fields.push({
						label: field.label,
						type: field.type,
						files: field.files.toPointers()
					});
				} else if (field.value) {
					fields.push({
						label: field.label,
						type: field.type,
						value: field.value
					});
				}
			}

			const hash = await RequestHasher.hash(data.email, fields);

			await StorageClient.createRequest(account.address, requestId, formId, data.email, fields);
			requestCreated = true;

			const contract = new BlockchainContractClient(account);
			await contract.createRequest(formId, requestId, data.quantity, totalPrice, hash);
		} catch (e) {
			if (requestCreated) {
				await StorageClient.deleteRequest(requestId);
			}
			throw e;
		}

		setNavigateTo(state.value.requireApproval
			? `/forms/${formId}/pre-receipt`
			: `/forms/${formId}/post-receipt`);
	}

	if (navigateTo) {
		return <Navigate to={navigateTo} />
	}
	return (
		<Loader state={state} element={(form =>
			<Fragment>
				<ConnectYourWallet requiredNetworkId={1} className="mb" />
				<Meta title={form.name} element={<FormGenerator form={form} onSave={save} />} />
			</Fragment>)} />
	);
}
