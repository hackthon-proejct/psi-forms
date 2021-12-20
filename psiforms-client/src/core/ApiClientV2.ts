import Moralis from 'moralis';
import Web3 from 'web3';

import { FieldModel } from '../components/form/FormModel';
import { FormDto } from './ApiModelV2';

export class ApiClientV2 {

	public static async createForm(formId: string, name: string, description: string, fields: FieldModel[]): Promise<string> {
		const user = Moralis.User.current();
		if (!user) {
			throw new Error('Not logged in');
		}

		const acl = new Moralis.ACL();
		acl.setPublicReadAccess(false);
		acl.setPublicWriteAccess(false);
		acl.setReadAccess(user, true);
		acl.setWriteAccess(user, true);

		const entity = new FormEntity(formId, name, description, JSON.stringify(fields));
		entity.setACL(acl);
		await entity.save();

		return entity.id;
	}

	public static async getForms(creator: string): Promise<FormDto[]> {
		const formCreatedQuery = new Moralis.Query(FormCreatedEntity);
		formCreatedQuery.equalTo('creator', creator);

		const formCreatedRows = (await formCreatedQuery.find()).map(obj => {
			const formId = Web3.utils.toBN(obj.get('formId'));
			return {
				id: Web3.utils.toHex(formId),
				isEnabled: obj.get('isEnabled'),
				unitPrice: obj.get('unitPrice'),
				requireApproval: obj.get('requireApproval'),
				minQuantity: parseInt(obj.get('minQuantity'), 10),
				maxQuantity: parseInt(obj.get('maxQuantity'), 10),
				creator: obj.get('creator')
			};
		});

		const formQuery = new Moralis.Query(FormEntity);
		formQuery.containsAll('formId', formCreatedRows.map(r => r.id));
		const formRows = (await formQuery.find()).map(obj => {
			return {
				formId: obj.get('formId'),
				name: obj.get('name'),
				description: obj.get('description'),
				fields: obj.get('fields')
			};
		});

		const forms = formCreatedRows.map<FormDto>(row => {
			const form = formRows.find(r => r.formId === row.id);
			return {
				id: row.id,
				isEnabled: row.isEnabled,
				unitPrice: row.unitPrice,
				requireApproval: row.requireApproval,
				minQuantity: row.minQuantity,
				maxQuantity: row.maxQuantity,
				name: form?.name || '',
				description: form?.description || '',
				fields: form?.fields || '{}',
			};
		});
		return forms;
	}
}

class FormCreatedEntity extends Moralis.Object {

	public constructor() {
		super('FormCreated');
	}
}

class FormEntity extends Moralis.Object {

	public constructor(formId: string, name: string, description: string, fields: string) {
		super('Form');
		this.set('formId', formId);
		this.set('name', name);
		this.set('description', description);
		this.set('fields', fields);
	}
}
