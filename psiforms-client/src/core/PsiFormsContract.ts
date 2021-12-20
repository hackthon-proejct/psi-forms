import BN from 'bn.js';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

import network1 from '../assets/abi/psiforms-1.json';
import abi from '../assets/abi/psiforms-abi.json';
import { Account } from '../components/wallet/WalletContext';

export class PsiFormsContract {

	private readonly contract: Contract;

	public constructor(account: Account) {
		let address: string;

		switch (account.network.id) {
			case 1:
				address = (network1 as any).address;
				break;
			default:
				throw new Error(`This network is not supported: ${account.network.id}`);
		}

		this.contract = new account.web3.eth.Contract(abi as any, address, {
			from: account.address
		});
	}

	public async createForm(formId: string, isEnabled: boolean, requireApproval: boolean, minQuantity: number, maxQuantity: number, price: BN): Promise<string> {
		const result = await this.contract.methods['createForm'](
			formId,
			isEnabled,
			requireApproval,
			minQuantity,
			maxQuantity,
			price).send() as ContractResult;
		return result.transactionHash;
	}

	public async updateForm(formId: string, isEnabled: boolean, minTime: number, maxTime: number, price: BN) {
		const result = await this.contract.methods['updateForm'](
			formId,
			isEnabled,
			minTime,
			maxTime,
			price).send() as ContractResult;
		return result.transactionHash;
	}

	public async createRequest(formId: string, requestId: string, time: number, value: BN) {
		const result = await this.contract.methods['createRequest'](
			formId,
			requestId,
			time).send({ value }) as ContractResult;
		return result.transactionHash;
	}

	public async rollBackRequest(formId: string, requestId: string) {
		const result = await this.contract.methods['rollBackRequest'](
			formId,
			requestId).send() as ContractResult;
		return result.transactionHash;
	}

	public async approveOrRejectRequest(formId: string, requestIds: string[], statuses: boolean[]) {
		const result = await this.contract.methods['approveOrRejectRequest'](
			formId,
			requestIds,
			statuses).send() as ContractResult;
		return result.transactionHash;
	}
}

interface ContractResult {
	blockHash: string;
	events: any[];
	transactionHash: string;
}
