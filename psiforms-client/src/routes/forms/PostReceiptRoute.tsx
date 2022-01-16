import { useCallback } from 'react';
import { useParams } from 'react-router';

import { Receipt } from '../../components/receipt/Receipt';
import { PostReceiptLoader } from '../../components/receipt/ReceiptLoader';
import { RequestStatus } from '../../storage/Model';
import { StorageClient } from '../../storage/StorageClient';

export function PostReceiptRoute() {
	const { id } = useParams();
	const requestId = id as string;

	return <PostReceiptLoader
		loader={useCallback(async () => {
			const request = await StorageClient.getRequest(requestId);
			if (request.status !== RequestStatus.approved) {
				return null;
			}
			return StorageClient.tryGetPostReceipt(request.formId);
		}, [requestId])}
		element={receipt => {
			return <Receipt message={receipt.message} files={receipt.files} />;
		}} />;
}
