import BN from 'bn.js';
import Web3 from 'web3';

import {
    FieldModel,
    FieldType,
    FileFieldModel,
    FileType,
    FormModel,
    NumberFieldModel,
    TextFieldModel,
} from '../FormModel';

export function initializeNewForm(): FormModel {
	return {
		id: Web3.utils.randomHex(22),
		name: 'Form title',
		description: 'Form description',
		approval: false,
		fields: [],
		itemPrice: new BN(100000000000),
		minQuantity: 1,
		maxQuantity: 1
	};
}

export function initializeField(type: FieldType): FieldModel {
	switch (type) {
		case FieldType.text:
			return { type, label: 'Label for Text Field', isRequired: false } as TextFieldModel;
		case FieldType.number:
			return { type, label: 'Label for Number Field', isRequired: false } as NumberFieldModel;
		case FieldType.file:
			return { type, label: 'Label for File Field', isRequired: false, fileType: FileType.any } as FileFieldModel;
		default:
			throw new Error(`Not supported type: ${type}`);
	}
}
