import { SHA256 } from './SHA256';

test('SHA256() returns proper value', async () => {
	const hash = (await SHA256('foo')).toString('hex');

	expect(hash).toEqual('2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae');
});
