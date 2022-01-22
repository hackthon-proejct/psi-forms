import Web3 from 'web3';

export class IdGenerator {

	public static randomId(bytes: number): string {
		return Web3.utils.randomHex(bytes);
	}
}
