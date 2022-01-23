import Moralis from 'moralis';

import { BNConverter } from '../../core/BNConverter';

declare global {
	interface Window {
		etherum?: any;
	}
}

export async function waitForWeb3(): Promise<void> {
	if (typeof window.etherum !== 'undefined') {
		await Moralis.Web3.enableWeb3();
	}
}

export function toNumericId(value: string): string {
	return BNConverter.parseBN(value).toString();
}

export function toHexId(value: string): string {
	const v = BNConverter.parseBN(value);
	return BNConverter.toHex(v);
}

export async function getCurrentUser(): Promise<Moralis.User> {
	const user = Moralis.User.current();
	if (!user) {
		throw new Error('Not logged in');
	}
	return user;
}

export async function tryReadEntity<T extends Moralis.Object>(t: new () => T, columnName: string, value: any): Promise<T | null> {
	const entity = await (new Moralis.Query(t)
		.equalTo(columnName, value))
		.first();
	return entity || null;
}

export async function readEntity<T extends Moralis.Object>(t: new () => T, columnName: string, value: any): Promise<T> {
	const entity = await tryReadEntity(t, columnName, value);
	if (!entity) {
		const className = new t().className;
		throw new Error(`Cannot find ${className} (${columnName} = ${value})`);
	}
	return entity;
}
