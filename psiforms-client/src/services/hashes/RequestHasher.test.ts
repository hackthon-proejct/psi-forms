import { FieldData, FieldType } from '../../storage/Model';
import { RequestHasher } from './RequestHasher';

test('hash() returns always same hash', async () => {
	const email = 'test@x.com';
	const fields: FieldData[] = [
		{ type: FieldType.text, label: 'x', value: 'y' }
	];

	const hash = (await RequestHasher.hash(email, fields)).toString('hex');

	expect(hash).toEqual('8f6c537dc0233f70e9deea120873868790122dd9d66400e7c944d4065c9ccc9c');
});
