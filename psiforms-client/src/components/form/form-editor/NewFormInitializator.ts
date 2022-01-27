import BN from 'bn.js';

import { StorageClient } from '../../../storage/StorageClient';
import { Form, Notifications } from '../Form';
import { PostReceipt, PreReceipt } from '../Receipt';

export function initializeNewForm(): Form {
	return {
		name: 'My Form Title',
		description: 'Enter a form description here.',
		requireApproval: false,
		fields: [],
		isEnabled: true,
		unitPrice: new BN('10000000000000000'),
		minQuantity: 1,
		maxQuantity: 1
	};
}

export function initializeNotifications(): Notifications {
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
		message: 'Thanks for the payment.',
		files: StorageClient.createFilesContainer()
	};
}
