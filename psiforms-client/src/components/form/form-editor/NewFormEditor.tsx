import { Fragment, useState } from 'react';

import { FormBlock } from '../../layout/FormBlock';
import { useWallet } from '../../wallet/WalletContext';
import { FormGenerator } from '../form-generator/FormGenerator';
import { BlockchainForm, Field, Form } from '../Form';
import { ApprovalFormEditor } from './approval/ApprovalFormEditor';
import { BasicsFormEditor } from './basics/BasicsFormEditor';
import { EarningsFormEditor } from './earnings/EarningsFormEditor';
import { FieldsFormEditor } from './fields/FieldsFormEditor';
import { initializeNewForm } from './NewFormInitializator';

export interface NewFormEditorProps {
	form?: Form;
	onSave: (form: Form) => Promise<boolean>;
}

export function NewFormEditor(props: NewFormEditorProps) {
	const wallet = useWallet();
	const account = wallet.tryGetAccount();

	const [form, setForm] = useState<Form>(() => props.form ?? initializeNewForm());
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
		return props.onSave(form);
	}

	return (
		<Fragment>
			<FormBlock title="Create Form" submitText="Create Form" onSubmit={onSubmited}>
				<BasicsFormEditor isReadonly={isReadonly} name={form.name} description={form.description}
					onChange={onBasicsChanged} />
				<EarningsFormEditor isReadonly={isReadonly} form={form}
					onChange={onEarningsChanged}/>
				<ApprovalFormEditor isReadonly={isReadonly} requireApproval={form.requireApproval}
					onChange={onRequireApprovalChanged} />
				<FieldsFormEditor fields={form.fields} onChange={onFieldsChanged} />
			</FormBlock>

			<div className="form">
				<h2>Preview</h2>

				<FormGenerator form={form} />
			</div>
		</Fragment>
	);
}
