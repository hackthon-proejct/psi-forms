import { useCallback } from 'react';
import { useParams } from 'react-router';

import { Receipt } from '../../components/receipt/Receipt';
import { PreReceiptLoader } from '../../components/receipt/ReceiptLoader';
import { StorageClient } from '../../storage/StorageClient';

export function PreReceiptRoute() {
	const { id } = useParams();
	const requestId = id as string;

	return <PreReceiptLoader
		loader={useCallback(async () => {
			const request = await StorageClient.getRequest(requestId);
			return await StorageClient.tryGetPreReceipt(request.formId);
		}, [requestId])}
		element={receipt => {
			return <Receipt message={receipt.message} />;
		}} />;
}
