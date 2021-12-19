import BN from 'bn.js';
import { Contract } from 'web3-eth-contract';

import abi from '../assets/abi/forms-abi.json';
import network5777 from '../assets/abi/forms-network-5777.json';
import network97 from '../assets/abi/forms-network-97.json';
import network56 from '../assets/abi/forms-network-56.json';
import { Account } from '../components/wallet/WalletContext';

export class FormsContract {

	private readonly contract: Contract;

	public constructor(account: Account) {
		let address: string;

		switch (account.network.id) {
			case 56:
				address = (network56 as any).address;
				break;
			case 97:
				address = (network97 as any).address;
				break;
			case 5777:
				address = (network5777 as any).address;
				break;
			default:
				throw new Error('This network is not supported.');
		}

		this.contract = new account.web3.eth.Contract(abi as any, address, {
			from: account.address
		});
	}

	public async createAdBox(adBoxId: string, isEnabled: boolean, minTime: number, maxTime: number, price: BN): Promise<string> {
		const result = await this.contract.methods['createAdBox'](
			adBoxId,
			isEnabled,
			minTime,
			maxTime,
			price).send() as ContractResult;
		return result.transactionHash;
	}

	public async updateAdBox(adBoxId: string, isEnabled: boolean, minTime: number, maxTime: number, price: BN) {
		const result = await this.contract.methods['updateAdBox'](
			adBoxId,
			isEnabled,
			minTime,
			maxTime,
			price).send() as ContractResult;
		return result.transactionHash;
	}

	public async buyAd(adBoxId: string, adId: string, time: number, value: BN) {
		const result = await this.contract.methods['buyAd'](
			adBoxId,
			adId,
			time).send({ value }) as ContractResult;
		return result.transactionHash;
	}

	public async rollBackAd(adBoxId: string, adId: string) {
		const result = await this.contract.methods['rollBackAd'](
			adBoxId,
			adId).send() as ContractResult;
		return result.transactionHash;
	}

	public async approveOrRejectAds(adBoxId: string, adIds: string[], statuses: boolean[]) {
		const result = await this.contract.methods['approveOrRejectAds'](
			adBoxId,
			adIds,
			statuses).send() as ContractResult;
		return result.transactionHash;
	}
}

interface ContractResult {
	blockHash: string;
	events: any[];
	transactionHash: string;
}
