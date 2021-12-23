import { Fragment } from 'react';
import { useParams } from 'react-router';

import { PreReceiptViewer } from '../../components/receipt/ReceiptViewer';
import { StorageClient } from '../../storage/StorageClient';

export function PreReceiptRoute() {
	const { id } = useParams();
	const formId = id as string;

	return <PreReceiptViewer formId={formId}
		loader={(id) => StorageClient.tryGetPreReceipt(id)}
		element={receipt => {
			return (
				<Fragment>
					<textarea defaultValue={receipt.message}></textarea>
				</Fragment>
			);
		}} />;
}
