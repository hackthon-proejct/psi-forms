
export interface NetworkInfo {
	id: number;
	web3NetworkId: number;
	name: string;
	ethSymbol: string;
	ethDecimals: number;
	isSupported: boolean;
}

export const networkInfos: NetworkInfo[] = [
	{
		id: 1,
		web3NetworkId: 1,
		name: 'Ethereum Mainnet',
		ethDecimals: 18,
		ethSymbol: 'ETH',
		isSupported: false
	},
	{
		id: 56,
		web3NetworkId: 56,
		name: 'BSC',
		ethDecimals: 18,
		ethSymbol: 'BNB',
		isSupported: true
	},
	{
		id: 97,
		web3NetworkId: 97,
		name: 'BSC Testnet',
		ethDecimals: 18,
		ethSymbol: 'BNB',
		isSupported: true
	},
	{
		id: 5777,
		web3NetworkId: 5777,
		name: 'Ganache',
		ethDecimals: 18,
		ethSymbol: 'ETH',
		isSupported: true
	}
];

export function determineNetworkType(web3NetworkId: number): NetworkInfo {
	const network = networkInfos.find(n => n.web3NetworkId === web3NetworkId);
	return network || {
		id: -1,
		web3NetworkId: -1,
		name: 'Unknown',
		ethDecimals: 18,
		ethSymbol: 'ETH',
		isSupported: false
	};
}

export function getNetworkInfo(networkId: number): NetworkInfo {
	const ni = networkInfos.find(n => n.id === networkId);
	if (!ni) {
		throw new Error(`Cannot find network by id ${networkId}`);
	}
	return ni;
}
