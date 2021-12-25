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

	function onFileDeleted(fileId: number) {
		console.log('index', fileId);
		const files = props.postReceipt.files.clone();
		files.delete(fileId);
		updateFiles(files);
	}

	const files = props.postReceipt.files.getDeltas();
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
		</Fragment>
	);
}
