import { useState } from 'react';

import { EmailValidator } from '../../core/EmailValidator';
import { FormSection } from '../layout/FormSection';

export interface EditCreatorProfileProps {
	email: string;
	onSave: (email: string) => Promise<boolean>;
}

export function EditCreatorProfile(props: EditCreatorProfileProps) {

	const [email, setEmail] = useState<string>(() => props.email);

	async function onSubmited(): Promise<boolean> {
		if (!EmailValidator.validate(email)) {
			throw new Error('E-mail is invalid');
		}
		return props.onSave(email);
	}

	return (
		<FormSection title="Edit My Profile" submitText="Save" onSubmit={onSubmited}>
			<div className="form-section">
				<div className="form-section-header">
					<h3>Notifications</h3>
				</div>
				<div className="form-section-body">
					<div className="form-group">
						<label>E-mail *</label>
						<input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
					</div>
				</div>
			</div>
		</FormSection>
	);
}
