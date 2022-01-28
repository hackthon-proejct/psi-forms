import BN from 'bn.js';
import { Contract } from 'web3-eth-contract';

import abi from '../assets/abi/psiforms-abi.json';
import { Account } from '../components/wallet/WalletContext';
import { currentInstance } from './InstanceProvider';

export class BlockchainContractClient {

	private readonly contract: Contract;

	public constructor(account: Account) {
		if (account.network.id !== currentInstance.networkId) {
			throw new Error('Your network is not supported');
		}

		this.contract = new account.web3.eth.Contract(abi as any, currentInstance.smartContractAddress, {
			from: account.address
		});
	}

	public async createForm(formId: string, isEnabled: boolean, requireApproval: boolean, minQuantity: number, maxQuantity: number, unitPrice: BN): Promise<string> {
		const result = await this.contract.methods['createForm'](
			formId,
			isEnabled,
			requireApproval,
			minQuantity,
			maxQuantity,
			unitPrice).send() as ContractResult;
		return result.transactionHash;
	}

	public async updateForm(formId: string, isEnabled: boolean, minQuantity: number, maxQuantity: number, unitPrice: BN) {
		const result = await this.contract.methods['updateForm'](
			formId,
			isEnabled,
			minQuantity,
			maxQuantity,
			unitPrice).send() as ContractResult;
		return result.transactionHash;
	}

	public async createRequest(formId: string, requestId: string, quantity: number, value: BN, hash: BN) {
		const result = await this.contract.methods['createRequest'](
			formId,
			requestId,
			quantity,
			hash).send({ value }) as ContractResult;
		return result.transactionHash;
	}

	public async rollBackRequest(formId: string, requestId: string) {
		const result = await this.contract.methods['rollBackRequest'](
			formId,
			requestId).send() as ContractResult;
		return result.transactionHash;
	}

	public async approveOrRejectRequests(formId: string, requestIds: string[], statuses: boolean[]) {
		const result = await this.contract.methods['approveOrRejectRequests'](
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
