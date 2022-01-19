
export interface NetworkInfo {
	id: number;
	networkId: number;
	chainId: number;
	name: string;
	ethSymbol: string;
	ethDecimals: number;
	isSupported: boolean;
}

export const networkInfos: NetworkInfo[] = [
	{
		id: 1,
		networkId: 1,
		chainId: 43113,
		name: 'Avalanche Testnet',
		ethDecimals: 18,
		ethSymbol: 'AVAX',
		isSupported: false
	},
	{
		id: 1,
		networkId: 43113,
		chainId: 43113,
		name: 'Avalanche Testnet',
		ethDecimals: 18,
		ethSymbol: 'AVAX',
		isSupported: false
	}
];

export function determineNetwork(networkId: number, chainId: number): NetworkInfo {
	const network = networkInfos.find(n => n.networkId === networkId && n.chainId === chainId);
	return network || {
		id: -1,
		networkId: -1,
		chainId: -1,
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
