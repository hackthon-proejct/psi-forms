import { IdGenerator } from './IdGenerator';

test('randomId() returns proper value', async () => {
	for (let i = 8; i < 64; i += 8) {
		const id = IdGenerator.randomId(i);

		expect(id.startsWith('0x')).toEqual(true);
		expect(id.length).toEqual(2 + i * 2);
	}
});
