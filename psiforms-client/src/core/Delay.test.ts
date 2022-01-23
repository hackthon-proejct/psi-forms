import { delay } from './Delay';

test('delay() pauses execution', async () => {
	const start = Date.now();

	await delay(200);

	const elapsed = Date.now() - start;

	expect(elapsed).toBeGreaterThan(200 - 50);
	expect(elapsed).toBeLessThan(200 + 50);
});
