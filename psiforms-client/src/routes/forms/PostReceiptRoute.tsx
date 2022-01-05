import { useCallback } from 'react';
import { useParams } from 'react-router';

import { Receipt } from '../../components/receipt/Receipt';
import { PostReceiptLoader } from '../../components/receipt/ReceiptLoader';
import { StorageClient } from '../../storage/StorageClient';

export function PostReceiptRoute() {
	const { id } = useParams();
	const formId = id as string;

	return <PostReceiptLoader
		loader={useCallback(() => {
			return StorageClient.tryGetPostReceipt(formId)
		}, [formId])}
		element={receipt => {
			return <Receipt message={receipt.message} files={receipt.files} />;
		}} />;
}
