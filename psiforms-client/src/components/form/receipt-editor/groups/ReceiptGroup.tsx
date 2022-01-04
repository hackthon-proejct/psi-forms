import { Fragment } from 'react';

import { FilesContainer } from '../../../../storage/FilesContainer';
import { PostReceipt, PreReceipt } from '../../Receipt';

export interface ReceiptGroupProps {
	requireApproval: boolean;
	isReadonly: boolean;
	preReceipt: PreReceipt;
	postReceipt: PostReceipt;
	onPreReceiptChange: (preReceipt: PreReceipt) => void;
	onPostReceiptChange: (preReceipt: PostReceipt) => void;
}

export function ReceiptGroup(props: ReceiptGroupProps) {

	function updateFiles(files: FilesContainer) {
		props.onPostReceiptChange({
			message: props.postReceipt.message,
			files
		});
	}

	function onPreMessageChanged(message: string) {
		props.onPreReceiptChange({ message });
	}

	function onPostMessageChanged(message: string) {
		props.onPostReceiptChange({
			message,
			files: props.postReceipt.files
		});
	}

	function onUploaded(input: HTMLInputElement) {
		if (!input.files) {
			return;
		}

		const files = props.postReceipt.files.clone();
		for (let i = 0; i < input.files.length; i++) {
			files.add(input.files[i]);
		}

		updateFiles(files);
		input.value = '';
	}

	function onFileDeleted(fileId: number) {
		const files = props.postReceipt.files.clone();
		files.delete(fileId);
		updateFiles(files);
	}

	const files = props.postReceipt.files.getDeltas();
	return (
		<Fragment>
			{props.requireApproval &&
				<div className="form-section">
					<div className="form-section-header">
						<h3>After Submission &amp; Payment</h3>
					</div>
					<div className="form-section-body">
						<div className="form-group">
							<label>Message</label>
							<textarea value={props.preReceipt.message} readOnly={props.isReadonly} onChange={e => onPreMessageChanged(e.target.value)} />
							<span>This message is not visible for your customer until confirmed payment on blockchain.</span>
						</div>
					</div>
				</div>}

			<div className="form-section">
				<div className="form-section-header">
					<h3>{props.requireApproval ? 'After Approval' : 'After Submission & Payment'}</h3>
				</div>
				<div className="form-section-body">
					<div className="form-group">
						<label>Message</label>
						<textarea value={props.postReceipt.message} readOnly={props.isReadonly} onChange={e => onPostMessageChanged(e.target.value)} />
						<span>This message is not visible for your customer until confirmed payment on blockchain and your approval.</span>
					</div>

					<div className="form-group">
						<label>Files to Download ({files.length} files)</label>
						<input type="file" onChange={e => onUploaded(e.target)} />

						<ul>
						{files.map((file) =>
							<li key={file.id}>&bull;
								{file.url
									? <a href={file.url} target="_blank" rel="noreferrer">{file.name}</a>
									: <span>{file.name}</span>}
								{' '}({Math.round(file.size / 1024)} KB){' '}
							<button onClick={() => onFileDeleted(file.id)}>x</button></li>)}
						</ul>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
