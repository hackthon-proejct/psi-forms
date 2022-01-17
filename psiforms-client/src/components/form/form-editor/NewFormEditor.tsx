import { Fragment, useState } from 'react';

import { Field } from '../../../storage/Model';
import { FormSection } from '../../layout/FormSection';
import { Receipt } from '../../receipt/Receipt';
import { useWallet } from '../../wallet/WalletContext';
import { BlockchainForm, Notifications, Form } from '../Form';
import { FormGenerator } from '../form-generator/FormGenerator';
import { PostReceipt, PreReceipt } from '../Receipt';
import { ReceiptGroup } from '../receipt-editor/groups/ReceiptGroup';
import { ApprovalFormGroup } from './groups/ApprovalFormGroup';
import { BasicsFormGroup } from './groups/BasicsFormGroup';
import { NotificationFormGroup } from './groups/NotificationFormGroup';
import { FieldsFormGroup } from './groups/fields/FieldsFormGroup';
import { PricingFormGroup } from './groups/PricingFormGroup';
import {
    initializeNotifications,
    initializeNewForm,
    initializePostReceipt,
    initializePreReceipt,
} from './NewFormInitializator';

export interface NewFormEditorProps {
	collectNotifications: boolean;
	onSave: (form: Form, notifications: Notifications | null, preReceipt: PreReceipt, post: PostReceipt) => Promise<boolean>;
}

export function NewFormEditor(props: NewFormEditorProps) {
	const wallet = useWallet();
	const account = wallet.tryGetAccount();

	const [form, setForm] = useState<Form>(() => initializeNewForm());
	const [notifications, setNotifications] = useState<Notifications>(() => initializeNotifications());
	const [preReceipt, setPreReceipt] = useState<PreReceipt>(() => initializePreReceipt());
	const [postReceipt, setPostReceipt] = useState<PostReceipt>(() => initializePostReceipt());
	const isReadonly = !account;

	function updateForm(delta: Partial<Form>) {
		setForm(Object.assign({}, form, delta));
	}

	function onBasicsChanged(name: string, description: string) {
		updateForm({ name, description });
	}

	function onNotificationsChanged(email: string) {
		setNotifications({ email });
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
		return props.onSave(
			form,
			props.collectNotifications ? notifications : null,
			preReceipt,
			postReceipt);
	}

	return (
		<Fragment>
			<FormSection title="Create Form" submitText="Create" onSubmit={onSubmited}>
				<BasicsFormGroup isReadonly={isReadonly} name={form.name} description={form.description}
					onChange={onBasicsChanged} />
				{props.collectNotifications &&
					<NotificationFormGroup email={notifications.email} isReadonly={isReadonly}
						onChange={onNotificationsChanged} />}
				<PricingFormGroup isReadonly={isReadonly} form={form}
					onChange={onEarningsChanged}/>
				<ApprovalFormGroup isReadonly={isReadonly} requireApproval={form.requireApproval}
					onChange={onRequireApprovalChanged} />
				<FieldsFormGroup fields={form.fields}
					onChange={onFieldsChanged} />
				<ReceiptGroup requireApproval={form.requireApproval} isReadonly={isReadonly} preReceipt={preReceipt} postReceipt={postReceipt}
					onPreReceiptChange={setPreReceipt} onPostReceiptChange={setPostReceipt} />
			</FormSection>

			<section className="section">
				<div className="section-header">
					<h2>Form Preview</h2>
				</div>
				<FormGenerator form={form} />
			</section>

			{form.requireApproval &&
				<section className="section">
					<div className="section-header">
						<h2>After Payment</h2>
					</div>
					<Receipt message={preReceipt.message} />
				</section>}

			<section className="section">
				<div className="section-header">
					<h2>{form.requireApproval ? 'After Approval' : 'After Payment'}</h2>
				</div>
				<Receipt message={postReceipt.message} files={postReceipt.files.toPointers(false)} />
			</section>
		</Fragment>
	);
}
