import { useCallback } from 'react';
import { useParams } from 'react-router';

import { ApprovableRequests } from '../../components/requests/ApprovableRequests';
import { StorageClient } from '../../storage/StorageClient';

export function FormRequestsRoute() {

	const { id } = useParams();
	const formId = id as string;

	const loader = useCallback(async () => {
		return StorageClient.getFormRequests(formId);
	}, [formId]);

	return <ApprovableRequests title="Form Requests" loader={loader} />;
}
