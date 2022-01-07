import Moralis from 'moralis';
import Web3 from 'web3';

export async function waitForWeb3(): Promise<void> {
	await Moralis.Web3.enableWeb3();
}

export function toNumericId(value: string): string {
	return Web3.utils.toBN(value).toString();
}

export function toHexId(value: string): string {
	return Web3.utils.toHex(Web3.utils.toBN(value));
}

export async function currentUser(): Promise<Moralis.User> {
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
