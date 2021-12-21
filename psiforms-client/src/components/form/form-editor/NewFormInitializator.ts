import BN from 'bn.js';
import Web3 from 'web3';

import { Form } from '../Form';

export function initializeNewForm(): Form {
	return {
		id: Web3.utils.randomHex(16),
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
