import Moralis from 'moralis';

import { FilesContainer } from './FilesContainer';
import { Field, FieldData, FilePointer, RequestStatus } from './Model';
import {
    CreatorProfileEntity,
    FormCreatedEntity,
    FormEntity,
    FormUpdatedEntity,
    PostReceiptEntity,
    PreReceiptEntity,
    RequestEntity,
} from './moralis/MoralisEntities';
import { MoralisFilesContainer } from './moralis/MoralisFilesContainer';
import { currentUser, readEntity, toHexId, toNumericId, tryReadEntity, waitForWeb3 } from './moralis/MoralisUtils';
import { CreatorProfileDto, FormDto, PostReceiptDto, PreReceiptDto, RequestDto, StorageFormDto } from './StorageModel';

export class StorageClient {

	// forms

	public static async createForm(creator: string, formId: string, name: string, description: string, fields: Field[]): Promise<void> {
		const creatorUser = await currentUser();

		const entity = FormEntity.create(creator, toNumericId(formId), name, description, fields);
		entity.setAccess(creatorUser.id);
		await entity.save();
	}

	public static async updateForm(formId: string, name: string, description: string, fields: Field[]): Promise<void> {
		const entity = await readEntity(FormEntity, 'formId', toNumericId(formId));
		FormEntity.update(entity, name, description, fields);
		await entity.save();
	}

	public static async deleteForm(formId: string): Promise<void> {
		const entity = await readEntity(FormEntity, 'formId', toNumericId(formId));
		await entity.destroy();
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

	public static async getCreatorForms(creator: string): Promise<StorageFormDto[]> {
		const query = new Moralis.Query(FormEntity)
			.equalTo('creator', creator)
			.addDescending('createdAt');
		return (await query.find()).map(obj => {
			return {
				id: toHexId(obj.get('formId')),
				isEnabled: obj.get('isEnabled'),
				name: obj.get('name'),
				description: obj.get('description'),
				fields: obj.get('fields'),
				creator: obj.get('creator')
			};
		});
	}

	// pre receipt

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

	public static async tryGetPreReceipt(formId: string): Promise<PreReceiptDto | null> {
		await waitForWeb3();

		const preReceipt = await tryReadEntity(PreReceiptEntity, 'formId', toNumericId(formId));
		if (!preReceipt) {
			return null;
		}
		return {
			message: preReceipt.get('message')
		};
	}

	// post receipt

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

	public static async tryGetPostReceipt(formId: string): Promise<PostReceiptDto | null> {
		await waitForWeb3();

		const postReceipt = await tryReadEntity(PostReceiptEntity, 'formId', toNumericId(formId));
		if (!postReceipt) {
			return null;
		}
		return {
			message: postReceipt.get('message'),
			files: postReceipt.get('files')
		};
	}

	// request

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

	public static async getRequest(requestId: string): Promise<RequestDto> {
		const entity = await readEntity(RequestEntity, 'requestId', toNumericId(requestId));
		return readRequest(entity);
	}

	public static async getSenderRequests(sender: string): Promise<RequestDto[]> {
		await waitForWeb3();

		return await readRequests(new Moralis.Query(RequestEntity)
			.equalTo('sender', sender)
			.notEqualTo('status', null)
			.addDescending('createdAt'));
	}

	public static async getFormRequests(formId: string): Promise<RequestDto[]> {
		await waitForWeb3();

		return await readRequests(new Moralis.Query(RequestEntity)
			.equalTo('formId', toNumericId(formId))
			.notEqualTo('status', null)
			.addDescending('createdAt'));
	}

	public static async getCreatorPendingRequests(creator: string): Promise<RequestDto[]> {
		await waitForWeb3();

		return await readRequests(new Moralis.Query(RequestEntity)
			.equalTo('creator', creator)
			.notEqualTo('status', null)
			.notContainedIn('status', [RequestStatus.approved, RequestStatus.rejected, RequestStatus.rolledBack])
			.addDescending('createdAt'));
	}

	// creator profile

	public static async tryGetCreatorProfile(creator: string): Promise<CreatorProfileDto | null> {
		const entity = await tryReadEntity(CreatorProfileEntity, 'creator', creator);
		if (entity) {
			return {
				email: entity.get('email')
			};
		}
		return null;
	}

	public static async createOrUpdateCreatorProfile(creator: string, email: string) {
		const creatorUser = await currentUser();

		let entity = await tryReadEntity(CreatorProfileEntity, 'creator', creator);
		if (!entity) {
			entity = CreatorProfileEntity.create(creator, email);
			entity.setAccess(creatorUser.id);
		} else {
			entity.set('email', email);
		}
		await entity.save();
	}

	// files container

	public static createFilesContainer(files?: FilePointer[]): FilesContainer {
		return MoralisFilesContainer.createFromPointers(files);
	}
}

function readFormEarningsFields(row: Moralis.Object, form: Partial<FormDto>) {
	form.isEnabled = row.get('isEnabled') || false;
	form.unitPrice = row.get('unitPrice');
	form.minQuantity = parseInt(row.get('minQuantity'), 10);
	form.maxQuantity = parseInt(row.get('maxQuantity'), 10);
}

async function readRequests(query: Moralis.Query<RequestEntity>): Promise<RequestDto[]> {
	const requestEntites = await query.find();
	return requestEntites.map<RequestDto>(readRequest);
}

function readRequest(entity: RequestEntity): RequestDto {
	return {
		id: toHexId(entity.get('requestId')),
		status: entity.get('status') || RequestStatus.pending,
		value: entity.get('value') || null,
		createdAt: new Date(entity.get('createdAt')),
		formId: toHexId(entity.get('formId')),
		email: entity.get('email'),
		fields: entity.get('fields'),
		sender: entity.get('sender')
	};
}
