import { useState } from 'react';

import { StorageClient } from '../../../storage/StorageClient';
import { FileDto } from '../../../storage/StorageModel';
import { FormBlock } from '../../layout/FormBlock';
import { PostReceipt, PreReceipt } from '../Receipt';
import { ReceiptGroup } from './groups/ReceiptGroup';

export interface ReceiptEditorProps {
	requireApproval: boolean;
	preMessage?: string;
	postMessage: string;
	postFiles: FileDto[];
	onSave: (preReceipt: PreReceipt, postReceipt: PostReceipt) => Promise<boolean>;
}

export function ReceiptEditor(props: ReceiptEditorProps) {

	const [state, setState] = useState(() => {
		const preReceipt: PreReceipt = {
			message: props.preMessage || ''
		};
		const postReceipt: PostReceipt = {
			message: props.postMessage,
			files: StorageClient.createFiles(props.postFiles)
		};
		return { preReceipt, postReceipt };
	});

	function onPreReceiptChange(preReceipt: PreReceipt) {
		setState({
			postReceipt: state.postReceipt,
			preReceipt
		});
	}

	function onPostReceiptChange(postReceipt: PostReceipt) {
		setState({
			postReceipt,
			preReceipt: state.preReceipt
		});
	}

	function onSubmit(): Promise<boolean> {
		return props.onSave(state.preReceipt, state.postReceipt);
	}

	return (
		<FormBlock title="Edit Receipt of Form" submitText="Edit Receipt" onSubmit={onSubmit}>
			<ReceiptGroup requireApproval={props.requireApproval} preReceipt={state.preReceipt} postReceipt={state.postReceipt}
				onPreReceiptChange={onPreReceiptChange} onPostReceiptChange={onPostReceiptChange} />
		</FormBlock>
	);
}
