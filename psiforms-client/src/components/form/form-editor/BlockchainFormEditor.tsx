import { useState } from 'react';
import Web3 from 'web3';

import { FormBlock } from '../../layout/FormBlock';
import { BlockchainForm } from '../Form';
import { PricingFormGroup } from './groups/PricingFormGroup';

export interface BlockchainFormEditorProps {
	isEnabled: boolean;
	unitPrice: string;
	minQuantity: number;
	maxQuantity: number;
	onSave: (form: BlockchainForm) => Promise<boolean>;
}

export function BlockchainFormEditor(props: BlockchainFormEditorProps) {

	const [form, setForm] = useState<BlockchainForm>(() => {
		return {
			isEnabled: props.isEnabled,
			unitPrice: Web3.utils.toBN(props.unitPrice),
			minQuantity: props.minQuantity,
			maxQuantity: props.maxQuantity
		};
	});

	function onSubmit(): Promise<boolean> {
		return props.onSave(form);
	}

	return (
		<FormBlock title="Edit Earnings of Form" submitText="Edit Form" onSubmit={onSubmit}>
			<PricingFormGroup isReadonly={false} form={form} onChange={setForm} />
		</FormBlock>
	);
}
