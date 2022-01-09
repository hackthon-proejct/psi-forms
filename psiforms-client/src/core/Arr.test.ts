import { Arr } from './Arr';

test('distinct() returns unique values', async () => {
	const r = Arr.distinct([1, 2, 2, 3, 3, 3, 3]);

	expect(r.length).toEqual(3);
	expect(r).toContain(1)
	expect(r).toContain(2)
	expect(r).toContain(3);
});
