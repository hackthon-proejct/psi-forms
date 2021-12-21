import { useState } from 'react';

export interface FormBlockProps {
	title: string;
	submitText: string;
	children: JSX.Element[] | JSX.Element;
	onSubmit: () => Promise<boolean>;
}

export function FormBlock(props: FormBlockProps) {

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
		}
		setIsProcessing(false);
	}

	return (
		<section className="form">
			<h2>{props.title}</h2>

			{props.children}

			{error && <p className="form-error">Error: {error}</p>}

			<div className="form-submit">
				<button className="btn btn-black btn-large" onClick={onSubmited}>
					{props.submitText}
					{isProcessing && <i className="ico ico-reload-white ico-ml ico-rotating" />}
				</button>
			</div>
		</section>
	);
}
