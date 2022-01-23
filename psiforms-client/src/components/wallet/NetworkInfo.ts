
export interface NetworkInfo {
	id: number;
	chainId: number;
	name: string;
	ethSymbol: string;
	ethDecimals: number;
	rpcUrl: string;
	isSupported: boolean;
}

export const networkInfos: NetworkInfo[] = [
	{
		id: 1,
		chainId: 43113,
		name: 'Avalanche Testnet',
		ethDecimals: 18,
		ethSymbol: 'AVAX',
		rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
		isSupported: true
	}
];

export function determineNetwork(chainId: number): NetworkInfo {
	const network = networkInfos.find(n => n.chainId === chainId);
	return network || {
		id: -1,
		chainId: -1,
		name: 'Unknown',
		ethDecimals: 18,
		ethSymbol: 'ETH',
		rpcUrl: '',
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
