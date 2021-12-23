import { Fragment } from 'react';
import { useParams } from 'react-router';

import { PostReceiptViewer } from '../../components/receipt/ReceiptViewer';
import { StorageClient } from '../../storage/StorageClient';

export function PostReceiptRoute() {
	const { id } = useParams();
	const formId = id as string;

	return <PostReceiptViewer formId={formId}
		loader={(id) => StorageClient.tryGetPostReceipt(id)}
		element={receipt => {
			return (
				<Fragment>
					<textarea defaultValue={receipt.message}></textarea>

					{receipt.files.map((file, index) =>
						<a key={index} href={file.url}>${file.name}</a>)}
				</Fragment>
			);
		}} />;
}
