import { useState } from 'react';

import { FormBlock } from '../../layout/FormBlock';
import { Field, Form, StorageForm } from '../Form';
import { BasicsFormGroup } from './groups/BasicsFormGroup';
import { FieldsFormGroup } from './groups/fields/FieldsFormGroup';

export interface StorageFormEditorProps {
	name: string;
	description: string;
	fields: string;
	onSave: (form: StorageForm) => Promise<boolean>;
}

export function StorageFormEditor(props: StorageFormEditorProps) {

	const [form, setForm] = useState<StorageForm>(() => {
		return {
			name: props.name,
			description: props.description,
			fields: JSON.parse(props.fields)
		};
	});

	function updateForm(delta: Partial<Form>) {
		setForm(Object.assign({}, form, delta));
	}

	function onBasicsChanged(name: string, description: string) {
		updateForm({ name, description });
	}

	function onFieldsChanged(fields: Field[]) {
		updateForm({ fields });
	}

	function onSubmit(): Promise<boolean> {
		return props.onSave(form);
	}

	return (
		<FormBlock title="Edit Form" submitText="Edit Form" onSubmit={onSubmit}>
			<BasicsFormGroup isReadonly={false} name={form.name} description={form.description}
				onChange={onBasicsChanged} />
			<FieldsFormGroup fields={form.fields} onChange={onFieldsChanged} />
		</FormBlock>
	);
}
