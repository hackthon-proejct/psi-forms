import { useParams } from 'react-router';

import { Receipt } from '../../components/receipt/Receipt';
import { PreReceiptLoader } from '../../components/receipt/ReceiptLoader';
import { StorageClient } from '../../storage/StorageClient';

export function PreReceiptRoute() {
	const { id } = useParams();
	const formId = id as string;

	return <PreReceiptLoader formId={formId}
		loader={(id) => StorageClient.tryGetPreReceipt(id)}
		element={receipt => {
			return <Receipt message={receipt.message} />;
		}} />;
}
