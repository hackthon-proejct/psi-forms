import BN from 'bn.js';

import { StorageClient } from '../../../storage/StorageClient';
import { Form, FormNotifications } from '../Form';
import { PostReceipt, PreReceipt } from '../Receipt';

export function initializeNewForm(): Form {
	return {
		name: 'Form title',
		description: 'Form description',
		requireApproval: false,
		fields: [],
		isEnabled: true,
		unitPrice: new BN('10000000000000000'),
		minQuantity: 1,
		maxQuantity: 1
	};
}

export function initializeFormNotifications(): FormNotifications {
	return {
		email: ''
	};
}

export function initializePreReceipt(): PreReceipt {
	return {
		message: 'Thanks for filling my form.'
	};
}

export function initializePostReceipt(): PostReceipt {
	return {
		message: 'Your request is approved.',
		files: StorageClient.createFilesContainer()
	};
}
