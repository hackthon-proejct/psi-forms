import Moralis from 'moralis';

import { Field, FieldData, FilePointer } from '../Model';

export class FormEntity extends Moralis.Object {

	public static create(creator: string, formId: string, name: string, description: string, fields: Field[]): FormEntity {
		const entity = new FormEntity();
		entity.set('creator', creator);
		entity.set('formId', formId);
		entity.set('name', name);
		entity.set('description', description);
		entity.set('fields', fields);

		entity.set('isEnabled', null);
		entity.set('requireApproval', null);
		return entity;
	}

	public constructor() {
		super('Form');
	}

	public static update(entity: FormEntity, name: string, description: string, fields: Field[]) {
		entity.set('name', name);
		entity.set('description', description);
		entity.set('fields', fields);
	}

	public setAccess(creatorUserId: string) {
		const acl = new Moralis.ACL();
		acl.setPublicReadAccess(true);
		acl.setPublicWriteAccess(false);
		acl.setReadAccess(creatorUserId, true);
		acl.setWriteAccess(creatorUserId, true);
		this.setACL(acl);
	}
}

export class FormCreatedEntity extends Moralis.Object {
	public constructor() {
		super('FormCreated');
	}
}

export class FormUpdatedEntity extends Moralis.Object {
	public constructor() {
		super('FormUpdated');
	}
}

export class PreReceiptEntity extends Moralis.Object {

	public static create(formId: string, message: string): PreReceiptEntity {
		const entity = new PreReceiptEntity();
		entity.set('formId', formId);
		entity.set('message', message);
		return entity;
	}

	public constructor() {
		super('PreReceipt');
	}

	public setAccess(creatorUserId: string) {
		const acl = new Moralis.ACL();
		acl.setPublicReadAccess(false);
		acl.setPublicWriteAccess(false);
		acl.setReadAccess(creatorUserId, true);
		acl.setWriteAccess(creatorUserId, true);
		this.setACL(acl);
	}
}

export class PostReceiptEntity extends Moralis.Object {

	public static create(formId: string, message: string, files: FilePointer[]): PostReceiptEntity {
		const entity = new PostReceiptEntity();
		entity.set('formId', formId);
		entity.set('message', message);
		entity.set('files', files);
		return entity;
	}

	public constructor() {
		super('PostReceipt');
	}

	public setAccess(creatorUserId: string) {
		const acl = new Moralis.ACL();
		acl.setPublicReadAccess(false);
		acl.setPublicWriteAccess(false);
		acl.setReadAccess(creatorUserId, true);
		acl.setWriteAccess(creatorUserId, true);
		this.setACL(acl);
	}
}

export class RequestEntity extends Moralis.Object {

	public static create(sender: string, requestId: string, formId: string, email: string, fields: FieldData[]): RequestEntity {
		const entity = new RequestEntity();
		entity.set('sender', sender);
		entity.set('requestId', requestId);
		entity.set('formId', formId);
		entity.set('email', email);
		entity.set('fields', fields);

		entity.set('creator', null);
		entity.set('status', null);
		return entity;
	}

	public constructor() {
		super('Request');
	}

	public setAccess(senderUserId: string, creatorUserId: string) {
		const acl = new Moralis.ACL();
		acl.setPublicReadAccess(false);
		acl.setPublicWriteAccess(false);
		acl.setReadAccess(senderUserId, true);
		acl.setWriteAccess(senderUserId, true);
		if (senderUserId !== creatorUserId) {
			acl.setReadAccess(creatorUserId, true);
			acl.setWriteAccess(creatorUserId, false);
		}
		this.setACL(acl);
	}
}

export class RequestApprovedEntity extends Moralis.Object {
	public constructor() {
		super('RequestApproved');
	}
}

export class RequestRejectedEntity extends Moralis.Object {
	public constructor() {
		super('RequestRejected');
	}
}

export class RequestRolledBackEntity extends Moralis.Object {
	public constructor() {
		super('RequestRolledBack');
	}
}
