import { useState } from 'react';

import { BNConverter } from '../../../core/BNConverter';
import { FormSection } from '../../layout/FormSection';
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
			unitPrice: BNConverter.parseBN(props.unitPrice),
			minQuantity: props.minQuantity,
			maxQuantity: props.maxQuantity
		};
	});

	function onSubmit(): Promise<boolean> {
		return props.onSave(form);
	}

	return (
		<FormSection title="Edit Earnings of Form" submitText="Save" onSubmit={onSubmit}>
			<PricingFormGroup isReadonly={false} form={form} onChange={setForm} />
		</FormSection>
	);
}
