import Moralis from 'moralis';
import Web3 from 'web3';

import { BasicsFormDto, FormDto } from './ApiModelV2';

async function waitFormMoralis(): Promise<void> {
	await Moralis.Web3.enableWeb3();
}

export class ApiClientV2 {

	public static async createForm(creator: string, formId: string, name: string, description: string, fields: string): Promise<string> {
		const user = Moralis.User.current();
		if (!user) {
			throw new Error('Not logged in');
		}

		const acl = new Moralis.ACL();
		acl.setPublicReadAccess(true);
		acl.setPublicWriteAccess(false);
		acl.setReadAccess(user, true);
		acl.setWriteAccess(user, true);

		const row = new FormEntity(creator, formId, name, description, fields);
		row.setACL(acl);
		await row.save();

		return row.id;
	}

	public static async updateForm(formId: string, name: string, description: string, fields: string): Promise<void> {
		const formRow = await (new Moralis.Query(FormEntity)
			.equalTo('formId', formId))
			.first();
		if (!formRow) {
			throw new Error(`Cannot find form ${formId}`);
		}

		formRow.set('name', name);
		formRow.set('description', description);
		formRow.set('fields', fields);
		await formRow.save();
	}

	public static async getForms(creator: string): Promise<BasicsFormDto[]> {
		const formQuery = new Moralis.Query(FormEntity)
			.equalTo('creator', creator)
			.addDescending('createdAt');
		return (await formQuery.find()).map(obj => {
			return {
				id: obj.get('formId'),
				name: obj.get('name'),
				description: obj.get('description'),
				fields: obj.get('fields')
			};
		});
	}

	public static async getForm(formId: string): Promise<FormDto> {
		await waitFormMoralis();

		const formIdInt = Web3.utils.toBN(formId).toString();

		const formCreatedRow = await (new Moralis.Query(FormCreatedEntity)
			.equalTo('formId', formIdInt))
			.first();
		if (!formCreatedRow) {
			throw new Error(`Cannot find form created event ${formId}`);
		}

		const form: Partial<FormDto> = {
			id: Web3.utils.toHex(formId),
			requireApproval: formCreatedRow.get('requireApproval')
		};
		readFormEarningsFields(formCreatedRow, form);

		const formQueryRow = await (new Moralis.Query(FormEntity)
			.equalTo('formId', formId))
			.first();
		if (!formQueryRow) {
			throw new Error(`Cannot find form ${formId}`);
		}

		form.name = formQueryRow.get('name');
		form.description = formQueryRow.get('description');
		form.fields = formQueryRow.get('fields');

		const formUpdatedRow = await (new Moralis.Query(FormUpdatedEntity)
			.equalTo('formId', formIdInt)
			.addDescending('createdAt'))
			.first();
		if (formUpdatedRow) {
			readFormEarningsFields(formUpdatedRow, form);
		}

		return form as FormDto;
	}
}

function readFormEarningsFields(row: Moralis.Object, form: Partial<FormDto>) {
	form.isEnabled = row.get('isEnabled');
	form.unitPrice = row.get('unitPrice');
	form.minQuantity = parseInt(row.get('minQuantity'), 10);
	form.maxQuantity = parseInt(row.get('maxQuantity'), 10);
}

class FormCreatedEntity extends Moralis.Object {

	public constructor() {
		super('FormCreated');
	}
}

class FormUpdatedEntity extends Moralis.Object {

	public constructor() {
		super('FormUpdated');
	}
}

class FormEntity extends Moralis.Object {

	public constructor(creator: string, formId: string, name: string, description: string, fields: string) {
		super('Form');
		this.set('creator', creator);
		this.set('formId', formId);
		this.set('name', name);
		this.set('description', description);
		this.set('fields', fields);
	}
}
