import { useState } from 'react';
import { FilePointer } from '../../../storage/Model';

import { StorageClient } from '../../../storage/StorageClient';
import { FormSection } from '../../layout/FormSection';
import { PostReceipt, PreReceipt } from '../Receipt';
import { ReceiptGroup } from './groups/ReceiptGroup';

export interface ReceiptEditorProps {
	requireApproval: boolean;
	preMessage?: string;
	postMessage: string;
	postFiles: FilePointer[];
	onSave: (preReceipt: PreReceipt, postReceipt: PostReceipt) => Promise<boolean>;
}

export function ReceiptEditor(props: ReceiptEditorProps) {

	const [state, setState] = useState(() => {
		const preReceipt: PreReceipt = {
			message: props.preMessage || ''
		};
		const postReceipt: PostReceipt = {
			message: props.postMessage,
			files: StorageClient.createFilesContainer(props.postFiles)
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
		<FormSection title="Edit Receipt of Form" submitText="Save" onSubmit={onSubmit}>
			<ReceiptGroup requireApproval={props.requireApproval} isReadonly={false} preReceipt={state.preReceipt} postReceipt={state.postReceipt}
				onPreReceiptChange={onPreReceiptChange} onPostReceiptChange={onPostReceiptChange} />
		</FormSection>
	);
}
