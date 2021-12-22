import { Fragment, useState } from 'react';

import { FormBlock } from '../../layout/FormBlock';
import { useWallet } from '../../wallet/WalletContext';
import { BlockchainForm, Field, Form, PostReceipt, PreReceipt } from '../Form';
import { FormGenerator } from '../form-generator/FormGenerator';
import { ApprovalFormEditor } from './approval/ApprovalFormEditor';
import { BasicsFormEditor } from './basics/BasicsFormEditor';
import { FieldsFormEditor } from './fields/FieldsFormEditor';
import { initializeNewForm, initializePostReceipt, initializePreReceipt } from './NewFormInitializator';
import { PricingFormEditor } from './pricing/PricingFormEditor';
import { ReceiptEditor } from './receipt/ReceiptEditor';

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
				<BasicsFormEditor isReadonly={isReadonly} name={form.name} description={form.description}
					onChange={onBasicsChanged} />
				<PricingFormEditor isReadonly={isReadonly} form={form}
					onChange={onEarningsChanged}/>
				<ApprovalFormEditor isReadonly={isReadonly} requireApproval={form.requireApproval}
					onChange={onRequireApprovalChanged} />
				<FieldsFormEditor fields={form.fields} onChange={onFieldsChanged} />
				<ReceiptEditor requireApproval={form.requireApproval} preReceipt={preReceipt} postReceipt={postReceipt}
					onPreReceiptChange={setPreReceipt} onPostReceiptChange={setPostReceipt} />
			</FormBlock>

			<FormGenerator form={form} />
		</Fragment>
	);
}
