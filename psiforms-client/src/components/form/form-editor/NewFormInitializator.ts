import BN from 'bn.js';

import { Form, PostReceipt, PreReceipt } from '../Form';

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

export function initializePreReceipt(): PreReceipt {
	return {
		message: ''
	};
}

export function initializePostReceipt(): PostReceipt {
	return {
		message: '',
		files: []
	};
}
