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
						<h3>After Payment</h3>
					</div>
					<div className="form-section-body">
						<div className="form-group">
							<label>
								Message *
								<span className="info">This message is not visible to your customer until a confirmed payment.</span>
							</label>
							<textarea value={props.preReceipt.message} readOnly={props.isReadonly} onChange={e => onPreMessageChanged(e.target.value)} />
						</div>
					</div>
				</div>}

			<div className="form-section">
				<div className="form-section-header">
					<h3>{props.requireApproval ? 'After Approval' : 'After Payment'}</h3>
				</div>
				<div className="form-section-body">
					<div className="form-group">
						<label>
							Message *
							<span className="info">
								{props.requireApproval
									? 'This message is not visible to your customer until a confirmed payment and your approval.'
									: 'This message is not visible to your customer until a confirmed payment.'}
							</span>
						</label>
						<textarea value={props.postReceipt.message} readOnly={props.isReadonly} onChange={e => onPostMessageChanged(e.target.value)} />
					</div>

					<div className="form-group">
						<label>Attached Files <span className="info">({files.length} files)</span></label>
						<input type="file" onChange={e => onUploaded(e.target)} />

						{files.length > 0 &&
							<ul className="file-list">
							{files.map((file) =>
								<li key={file.id}>
									<strong>{file.name}</strong>
									{' '}
									({Math.round(file.size / 1024)} KB)
									{' '}
									<button onClick={() => onFileDeleted(file.id)} className="btn btn-small btn-gray" title="Delete">
										<i className="ico ico-close-black" />
									</button>
								</li>)}
							</ul>}
					</div>
				</div>
			</div>
		</Fragment>
	);
}
