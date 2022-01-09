import BN from 'bn.js';

if (typeof crypto === 'undefined') {
	global.crypto = require('crypto').webcrypto;
}

if (typeof TextEncoder === 'undefined') {
	global.TextEncoder = require('util').TextEncoder;
}

export async function SHA256(data: string): Promise<BN> {
	const bytes = new TextEncoder().encode(data);
	const hash = await crypto.subtle.digest('SHA-256', bytes);
	return new BN(new Uint8Array(hash));
}
