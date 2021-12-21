import { useState } from 'react';

import { FormBlock } from '../../layout/FormBlock';
import { Field, Form, StorageForm } from '../Form';
import { BasicsFormEditor } from './basics/BasicsFormEditor';
import { FieldsFormEditor } from './fields/FieldsFormEditor';

export interface EditStorageFormEditorProps {
	name: string;
	description: string;
	fields: string;
	onSave: (form: StorageForm) => Promise<boolean>;
}

export function EditStorageFormEditor(props: EditStorageFormEditorProps) {

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
			<BasicsFormEditor isReadonly={false} name={form.name} description={form.description}
				onChange={onBasicsChanged} />
			<FieldsFormEditor fields={form.fields} onChange={onFieldsChanged} />
		</FormBlock>
	);
}
