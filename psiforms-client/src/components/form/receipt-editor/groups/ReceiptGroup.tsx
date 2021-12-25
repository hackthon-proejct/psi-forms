import { Fragment } from 'react';

import { FilesContainer } from '../../../../storage/FilesContainer';
import { PostReceipt, PreReceipt } from '../../Receipt';

export interface ReceiptGroupProps {
	requireApproval: boolean;
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

	function onFileDeleted(index: number) {
		const files = props.postReceipt.files.clone();
		files.delete(index);
		updateFiles(files);
	}

	const fileNames = props.postReceipt.files.getFileNames();
	return (
		<Fragment>
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
					<label>Files to Download ({fileNames.length} files)</label>
					<input type="file" onChange={e => onUploaded(e.target)} />

					<ul>
					{fileNames.map((fileName, index) =>
						<li key={index}>&bull; {fileName} <button onClick={() => onFileDeleted(index)}>x</button></li>)}
					</ul>
				</div>
			</div>
		</Fragment>
	);
}
