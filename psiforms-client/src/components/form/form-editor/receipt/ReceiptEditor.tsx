import { Fragment } from 'react';

import { PostReceipt, PreReceipt } from '../../Form';

export interface ReceiptEditorProps {
	requireApproval: boolean;
	preReceipt: PreReceipt;
	postReceipt: PostReceipt;
	onPreReceiptChange: (preReceipt: PreReceipt) => void;
	onPostReceiptChange: (preReceipt: PostReceipt) => void;
}

export function ReceiptEditor(props: ReceiptEditorProps) {

	function onPreMessageChanged(message: string) {
		props.onPreReceiptChange({ message });
	}

	function onPostMessageChanged(message: string) {
		props.onPostReceiptChange({
			message,
			files: props.postReceipt.files
		});
	}

	function onFileChanged(input: HTMLInputElement) {
		if (!input.files) {
			return;
		}

		const files = [...props.postReceipt.files];
		for (let i =0; i < input.files.length; i++) {
			files.push(input.files[i]);
		}

		props.onPostReceiptChange({
			message: props.postReceipt.message,
			files
		});

		input.value = '';
	}

	return (
		<Fragment>
			<h2>Receipt</h2>

			{props.requireApproval &&
				<div className="form-section">
					<h4>After Submission &amp; Payment</h4>

					<div className="form-group">
						<label>Message</label>
						<input type="text" value={props.preReceipt.message} onChange={e => onPreMessageChanged(e.target.value)} />
					</div>
				</div>}

			<div className="form-section">
				<h4>{props.requireApproval ? 'After Approval' : 'After Submission & Payment'}</h4>

				<div className="form-group">
					<label>Message</label>
					<input type="text" value={props.postReceipt.message} onChange={e => onPostMessageChanged(e.target.value)} />
				</div>

				<div className="form-group">
					<label>Files to Download ({props.postReceipt.files.length} files)</label>
					<input type="file" onChange={e => onFileChanged(e.target)} />

					{props.postReceipt.files.map((file, index) =>
						<span key={index}>{file.name}</span>)}
				</div>
			</div>
		</Fragment>
	);
}
