import { ReactNode, useState } from 'react';

export interface FormSectionProps {
	title: string;
	submitText: string;
	children: ReactNode;
	onSubmit: () => Promise<boolean>;
}

export function FormSection(props: FormSectionProps) {

	const [isProcessing, setIsProcessing] = useState<boolean>(() => false);
	const [error, setError] = useState<string>();

	async function onSubmited() {
		if (isProcessing) {
			return;
		}

		setIsProcessing(true);
		try {
			if (await props.onSubmit()) {
				return;
			}
		} catch (e) {
			setError((e as Error).message);
		} finally {
			setIsProcessing(false);
		}
	}

	return (
		<section className="section">
			<div className="section-header">
				<h2>{props.title}</h2>
			</div>
			<div className="section-body">
				{props.children}

				{error &&
					<div className="form-error">Error: {error}</div>}

				<div className="form-submit">
					<button className="btn btn-black btn-large" onClick={onSubmited}>
						<i className={isProcessing
							? 'ico ico-mr ico-refresh-white ico-rotating'
							: 'ico ico-mr ico-save-white'} />
						{props.submitText}
					</button>
				</div>
			</div>
		</section>
	);
}
