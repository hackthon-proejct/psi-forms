import { Fragment, useState } from 'react';

import { Field } from '../../../storage/Model';
import { FormBlock } from '../../layout/FormBlock';
import { useWallet } from '../../wallet/WalletContext';
import { BlockchainForm, Form } from '../Form';
import { FormGenerator } from '../form-generator/FormGenerator';
import { PostReceipt, PreReceipt } from '../Receipt';
import { ReceiptGroup } from '../receipt-editor/groups/ReceiptGroup';
import { ApprovalFormGroup } from './groups/ApprovalFormGroup';
import { BasicsFormGroup } from './groups/BasicsFormGroup';
import { FieldsFormGroup } from './groups/fields/FieldsFormGroup';
import { PricingFormGroup } from './groups/PricingFormGroup';
import { initializeNewForm, initializePostReceipt, initializePreReceipt } from './NewFormInitializator';

export interface NewFormEditorProps {
	onSave: (form: Form, preReceipt: PreReceipt, post: PostReceipt) => Promise<boolean>;
}

export function NewFormEditor(props: NewFormEditorProps) {
	const wallet = useWallet();
	const account = wallet.tryGetAccount();

	const [form, setForm] = useState<Form>(() => initializeNewForm());
	const [preReceipt, setPreReceipt] = useState<PreReceipt>(() => initializePreReceipt());
	const [postReceipt, setPostReceipt] = useState<PostReceipt>(() => initializePostReceipt());
	const isReadonly = !account;

	function updateForm(delta: Partial<Form>) {
		setForm(Object.assign({}, form, delta));
	}

	function onBasicsChanged(name: string, description: string) {
		updateForm({ name, description });
	}

	function onEarningsChanged(form: BlockchainForm) {
		updateForm(form);
	}

	function onRequireApprovalChanged(requireApproval: boolean) {
		updateForm({ requireApproval });
	}

	function onFieldsChanged(fields: Field[]) {
		updateForm({ fields });
	}

	function onSubmited(): Promise<boolean> {
		return props.onSave(form, preReceipt, postReceipt);
	}

	return (
		<Fragment>
			<FormBlock title="Create Form" submitText="Create Form" onSubmit={onSubmited}>
				<BasicsFormGroup isReadonly={isReadonly} name={form.name} description={form.description}
					onChange={onBasicsChanged} />
				<PricingFormGroup isReadonly={isReadonly} form={form}
					onChange={onEarningsChanged}/>
				<ApprovalFormGroup isReadonly={isReadonly} requireApproval={form.requireApproval}
					onChange={onRequireApprovalChanged} />
				<FieldsFormGroup fields={form.fields} onChange={onFieldsChanged} />
				<ReceiptGroup requireApproval={form.requireApproval} preReceipt={preReceipt} postReceipt={postReceipt}
					onPreReceiptChange={setPreReceipt} onPostReceiptChange={setPostReceipt} />
			</FormBlock>

			<FormGenerator form={form} />
		</Fragment>
	);
}
