import Moralis from 'moralis';

import { FormDto } from './ApiModelV2';

export class ApiClientV2 {

	public static async createForm(form: FormDto): Promise<string> {
		const user = Moralis.User.current();
		if (!user) {
			throw new Error('Not logged in');
		}

		const acl = new Moralis.ACL();
		acl.setPublicReadAccess(false);
		acl.setPublicWriteAccess(false);
		acl.setReadAccess(user, true);
		acl.setWriteAccess(user, true);

		const entity = new FormEntity(form);
		entity.setACL(acl);
		await entity.save();

		return entity.id;
	}
}

class FormEntity extends Moralis.Object {

	public constructor(
		public dto: FormDto) {
		super('Form');
		this.set('name', dto.name);
		this.set('description', dto.description);
		this.set('itemPrice', dto.itemPrice);
		this.set('minQuantity', dto.minQuantity);
		this.set('maxQuantity', dto.maxQuantity);
		this.set('approval', dto.approval);
		this.set('fields', dto.fields);
	}
}
