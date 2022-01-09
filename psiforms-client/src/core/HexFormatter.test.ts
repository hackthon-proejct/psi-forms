import { HexFormatter } from './HexFormatter';

test('formatHex() returns proper value', async () => {
	const r = HexFormatter.format('0xbAeF084077C2d00fe2CCb9265d8bA5f32A98f7C7');

	expect(r).toEqual('0xbAeF...f7C7');
});
