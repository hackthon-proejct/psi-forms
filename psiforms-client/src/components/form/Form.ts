import BN from 'bn.js';

import { Field, FileType } from '../../storage/Model';

export interface BlockchainForm {
	isEnabled: boolean;
	unitPrice: BN;
	minQuantity: number;
	maxQuantity: number;
}

export interface StorageForm {
	name: string;
	description: string;
	fields: Field[];
}

export interface Form extends BlockchainForm, StorageForm {
	requireApproval: boolean;
}

export interface FormNotifications {
	email: string;
}

export const fileTypes = [
	FileType.any,
	FileType.image,
	FileType.pdf
];
