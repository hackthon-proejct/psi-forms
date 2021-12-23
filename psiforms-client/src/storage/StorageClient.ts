import Moralis from 'moralis';
import Web3 from 'web3';

import {
    FormCreatedEntity,
    FormEntity,
    FormUpdatedEntity,
    PostReceiptEntity,
    PreReceiptEntity,
    RequestEntity,
} from './StorageEntities';
import { FileDto, FormDto, PostReceiptDto, PreReceiptDto, StorageFormDto } from './StorageModel';

export class StorageClient {

	public static async createForm(creator: string, formId: string, name: string, description: string, fields: string): Promise<void> {
		const user = await currentUser();

		const entity = FormEntity.create(creator, toIdInt(formId), name, description, fields);
		entity.setAccess(user.id);
		await entity.save();
	}

	public static async updateForm(formId: string, name: string, description: string, fields: string): Promise<void> {
		const entity = await readEntity(FormEntity, 'formId', toIdInt(formId));
		entity.set('name', name);
		entity.set('description', description);
		entity.set('fields', fields);
		await entity.save();
	}

	public static async deleteForm(formId: string): Promise<void> {
		const entity = await readEntity(FormEntity, 'formId', toIdInt(formId));
		await entity.destroy();
	}

	public static async createPreReceipt(formId: string, message: string): Promise<void> {
		const user = await currentUser();

		const entity = PreReceiptEntity.create(toIdInt(formId), message);
		entity.setAccess(user.id);
		await entity.save();
	}

	public static async deletePreReceipt(formId: string): Promise<void> {
		const entity = await readEntity(PreReceiptEntity, 'formId', toIdInt(formId));
		await entity.destroy();
	}

	public static async createPostReceipt(formId: string, message: string, inputFiles: File[]): Promise<void> {
		const user = await currentUser();

		const files = inputFiles.map(f => new Moralis.File(f.name, f));

		const entity = PostReceiptEntity.create(toIdInt(formId), message, files);
		entity.setAccess(user.id);
		await entity.save();
	}

	public static async deletePostReceipt(formId: string): Promise<void> {
		const entity = await readEntity(PostReceiptEntity, 'formId', toIdInt(formId));
		await entity.destroy();
	}

	public static async tryGetPreReceipt(formId: string): Promise<PreReceiptDto | null> {
		await waitForWeb3();
		const entity = await tryReadEntity(PreReceiptEntity, 'formId', toIdInt(formId));
		if (!entity) {
			return null;
		}
		return {
			message: entity.get('message')
		};
	}

	public static async tryGetPostReceipt(formId: string): Promise<PostReceiptDto | null> {
		await waitForWeb3();

		const entity = await tryReadEntity(PostReceiptEntity, 'formId', toIdInt(formId));
		if (!entity) {
			return null;
		}
		const files = (entity.get('files') as any[]).map<FileDto>(f => {
			let name: string = f['_name'];
			const pos = name.indexOf('_');
			if (pos >= 0) {
				name = name.substring(name.indexOf('_') + 1);
			}
			return {
				name,
				url: f['_url']
			};
		});
		return {
			message: entity.get('message'),
			files
		};
	}

	public static async getForms(creator: string): Promise<StorageFormDto[]> {
		const formQuery = new Moralis.Query(FormEntity)
			.equalTo('creator', creator)
			.addDescending('createdAt');
		return (await formQuery.find()).map(obj => {
			return {
				id: toIdHex(obj.get('formId')),
				name: obj.get('name'),
				description: obj.get('description'),
				fields: obj.get('fields'),
				creator: obj.get('creator')
			};
		});
	}

	public static async getForm(formId: string): Promise<FormDto> {
		await waitForWeb3();

		const formIdInt = toIdInt(formId);

		const formCreatedEntity = await readEntity(FormCreatedEntity, 'formId', formIdInt);

		const form: Partial<FormDto> = {
			id: formId,
			requireApproval: formCreatedEntity.get('requireApproval')
		};
		readFormEarningsFields(formCreatedEntity, form);

		const formEntity = await readEntity(FormEntity, 'formId', formIdInt);

		form.name = formEntity.get('name');
		form.description = formEntity.get('description');
		form.fields = formEntity.get('fields');
		form.creator = formEntity.get('creator');

		const formUpdatedEntity = await (new Moralis.Query(FormUpdatedEntity)
			.equalTo('formId', formIdInt)
			.addDescending('createdAt'))
			.first();
		if (formUpdatedEntity) {
			readFormEarningsFields(formUpdatedEntity, form);
		}

		return form as FormDto;
	}

	public static async createRequest(sender: string, requestId: string, formId: string, email: string, fields: string): Promise<void> {
		const senderUser = await currentUser();

		const formEntity = await readEntity(FormEntity, 'formId', toIdInt(formId));
		const formAcl = formEntity.getACL()?.toJSON(); // TODO
		const creatorUserId = Object.keys(formAcl).filter(id => id !== '*')[0];

		const entity = RequestEntity.create(sender, toIdInt(requestId), toIdInt(formId), email, fields);
		entity.setAccess(senderUser.id, creatorUserId);
		await entity.save();
	}

	public static async deleteRequest(requestId: string) {
		const entity = await readEntity(RequestEntity, 'requestId', toIdInt(requestId));
		await entity.destroy();
	}
}

function toIdInt(value: string): string {
	return Web3.utils.toBN(value).toString();
}

function toIdHex(value: string): string {
	return Web3.utils.toHex(Web3.utils.toBN(value));
}

async function waitForWeb3(): Promise<void> {
	await Moralis.Web3.enableWeb3();
}

async function currentUser(): Promise<Moralis.User> {
	const user = Moralis.User.current();
	if (!user) {
		throw new Error('Not logged in');
	}
	return user;
}

async function tryReadEntity<T extends Moralis.Object>(t: new () => T, columnName: string, value: any): Promise<T | null> {
	const entity = await (new Moralis.Query(t)
		.equalTo(columnName, value))
		.first();
	return entity || null;
}

async function readEntity<T extends Moralis.Object>(t: new () => T, columnName: string, value: any): Promise<T> {
	const entity = await tryReadEntity(t, columnName, value);
	if (!entity) {
		const className = new t().className;
		throw new Error(`Cannot find ${className} (${columnName} = ${value})`);
	}
	return entity;
}

function readFormEarningsFields(row: Moralis.Object, form: Partial<FormDto>) {
	form.isEnabled = row.get('isEnabled');
	form.unitPrice = row.get('unitPrice');
	form.minQuantity = parseInt(row.get('minQuantity'), 10);
	form.maxQuantity = parseInt(row.get('maxQuantity'), 10);
}
