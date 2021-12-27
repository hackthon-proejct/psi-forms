import Moralis from 'moralis';

import { FilesContainer } from './FilesContainer';
import { Field, FieldData, FilePointer, RequestStatus } from './Model';
import { MoralisFilesContainer } from './MoralisFilesContainer';
import { currentUser, readEntity, toHexId, toNumericId, tryReadEntity, waitForWeb3 } from './MoralisUtils';
import {
    FormCreatedEntity,
    FormEntity,
    FormUpdatedEntity,
    PostReceiptEntity,
    PreReceiptEntity,
    RequestApprovedEntity,
    RequestEntity,
    RequestRejectedEntity,
    RequestRolledBackEntity,
} from './StorageEntities';
import { FormDto, PostReceiptDto, PreReceiptDto, RequestDto, StorageFormDto } from './StorageModel';

export class StorageClient {

	public static async createForm(creator: string, formId: string, name: string, description: string, fields: Field[]): Promise<void> {
		const user = await currentUser();

		const entity = FormEntity.create(creator, toNumericId(formId), name, description, fields);
		entity.setAccess(user.id);
		await entity.save();
	}

	public static async updateForm(formId: string, name: string, description: string, fields: Field[]): Promise<void> {
		const entity = await readEntity(FormEntity, 'formId', toNumericId(formId));
		entity.set('name', name);
		entity.set('description', description);
		entity.set('fields', fields);
		await entity.save();
	}

	public static async deleteForm(formId: string): Promise<void> {
		const entity = await readEntity(FormEntity, 'formId', toNumericId(formId));
		await entity.destroy();
	}

	public static async createPreReceipt(formId: string, message: string): Promise<void> {
		const user = await currentUser();

		const entity = PreReceiptEntity.create(toNumericId(formId), message);
		entity.setAccess(user.id);
		await entity.save();
	}

	public static async updatePreReceipt(formId: string, message: string): Promise<void> {
		const entity = await readEntity(PreReceiptEntity, 'formId', toNumericId(formId));
		entity.set('message', message);
		await entity.save();
	}

	public static async deletePreReceipt(formId: string): Promise<void> {
		const entity = await readEntity(PreReceiptEntity, 'formId', toNumericId(formId));
		await entity.destroy();
	}

	public static async createPostReceipt(formId: string, message: string, files: FilePointer[]): Promise<void> {
		const user = await currentUser();

		const entity = PostReceiptEntity.create(toNumericId(formId), message, files);
		entity.setAccess(user.id);
		await entity.save();
	}

	public static async updatePostReceipt(formId: string, message: string, files: FilePointer[]): Promise<void> {
		const entity = await readEntity(PostReceiptEntity, 'formId', toNumericId(formId));

		entity.set('message', message);
		entity.set('files', files);
		await entity.save();
	}

	public static async deletePostReceipt(formId: string): Promise<void> {
		const entity = await readEntity(PostReceiptEntity, 'formId', toNumericId(formId));
		await entity.destroy();
	}

	public static async tryGetPreReceipt(formId: string): Promise<PreReceiptDto | null> {
		await waitForWeb3();

		const entity = await tryReadEntity(PreReceiptEntity, 'formId', toNumericId(formId));
		if (!entity) {
			return null;
		}
		return {
			message: entity.get('message')
		};
	}

	public static async tryGetPostReceipt(formId: string): Promise<PostReceiptDto | null> {
		await waitForWeb3();

		const entity = await tryReadEntity(PostReceiptEntity, 'formId', toNumericId(formId));
		if (!entity) {
			return null;
		}
		return {
			message: entity.get('message'),
			files: entity.get('files')
		};
	}

	public static async getCreatorForms(creator: string): Promise<StorageFormDto[]> {
		const query = new Moralis.Query(FormEntity)
			.equalTo('creator', creator)
			.addDescending('createdAt');
		return (await query.find()).map(obj => {
			return {
				id: toHexId(obj.get('formId')),
				name: obj.get('name'),
				description: obj.get('description'),
				fields: obj.get('fields'),
				creator: obj.get('creator')
			};
		});
	}

	public static async getForm(formId: string): Promise<FormDto> {
		await waitForWeb3();

		const formIdInt = toNumericId(formId);

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

	public static async createRequest(sender: string, requestId: string, formId: string, email: string, fields: FieldData[]): Promise<void> {
		const senderUser = await currentUser();

		const formEntity = await readEntity(FormEntity, 'formId', toNumericId(formId));
		const formAcl = formEntity.getACL()?.toJSON(); // TODO
		const creatorUserId = Object.keys(formAcl).filter(id => id !== '*')[0];

		const entity = RequestEntity.create(sender, toNumericId(requestId), toNumericId(formId), email, fields);
		entity.setAccess(senderUser.id, creatorUserId);
		await entity.save();
	}

	public static async deleteRequest(requestId: string) {
		const entity = await readEntity(RequestEntity, 'requestId', toNumericId(requestId));
		await entity.destroy();
	}

	public static async getSenderRequests(sender: string): Promise<RequestDto[]> {
		await waitForWeb3();

		return await readRequests(new Moralis.Query(RequestEntity)
			.equalTo('sender', sender)
			.addDescending('createdAt'));
	}

	public static async getFormRequests(formId: string): Promise<RequestDto[]> {
		await waitForWeb3();

		return await readRequests(new Moralis.Query(RequestEntity)
			.equalTo('formId', toNumericId(formId))
			.addDescending('createdAt'));
	}

	public static async getCreatorPendingRequests(creator: string): Promise<RequestDto[]> {
		await waitForWeb3();

		return await readRequests(new Moralis.Query(RequestEntity)
			.equalTo('creator', creator)
			.addDescending('createdAt'));
	}

	public static createFilesContainer(files?: FilePointer[]): FilesContainer {
		return MoralisFilesContainer.createFromPointers(files);
	}
}

function readFormEarningsFields(row: Moralis.Object, form: Partial<FormDto>) {
	form.isEnabled = row.get('isEnabled');
	form.unitPrice = row.get('unitPrice');
	form.minQuantity = parseInt(row.get('minQuantity'), 10);
	form.maxQuantity = parseInt(row.get('maxQuantity'), 10);
}

async function readRequests(query: Moralis.Query<RequestEntity>): Promise<RequestDto[]> {
	const requestEntites = await query.find();
	const requests = requestEntites.map<RequestDto>(entity => {
		return {
			id: entity.get('requestId'),
			createdAt: new Date(entity.get('createdAt')),
			formId: toHexId(entity.get('formId')),
			email: entity.get('email'),
			fields: entity.get('fields'),
			sender: entity.get('sender'),
			status: RequestStatus.pending
		};
	});

	const requestIdInts = requestEntites.map(e => e.get('requestId')) as string[];
	if (requestIdInts.length > 0) {
		await Promise.all([
			readRequestStatuses(RequestApprovedEntity, requestIdInts, requests, RequestStatus.approved),
			readRequestStatuses(RequestRejectedEntity, requestIdInts, requests, RequestStatus.rejected),
			readRequestStatuses(RequestRolledBackEntity, requestIdInts, requests, RequestStatus.rolledBack)
		]);
	}

	requests.forEach(request => {
		request.id = toHexId(request.id);
	});
	return requests;
}

async function readRequestStatuses<T extends Moralis.Object>(t: new () => T, requestIdInts: any[], requests: RequestDto[], status: RequestStatus) {
	const entities = await (new Moralis.Query(t)
		.containedIn('requestId', requestIdInts)
		.find());
	entities.forEach(entity => {
		const request = requests.find(r => r.id === entity.get('requestId'));
		if (request) {
			request.status = status;
		}
	});
}
