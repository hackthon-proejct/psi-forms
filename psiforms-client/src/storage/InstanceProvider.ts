
export interface Instance {
	isTestnet: boolean;
	smartContractAddress: string;
	moralisServerUrl: string;
	moralisAppId: string;
	networkId: number;
	smartContractUrl: string;
}

function determinInstance(): Instance {
	const testnetHosts = [
		'testnet.psiforms.com',
		'localhost'
	];

	if (testnetHosts.includes(window.location.hostname)) {
		return {
			isTestnet: true,
			smartContractAddress: '0xA33F22d034b0568200020DFe0646BB9e08494a07',
			moralisServerUrl: 'https://onnup17cc6oe.usemoralis.com:2053/server',
			moralisAppId: 'lJuCkr57EzEToK6HNCQH1AEksTArRGIhSHlNXioW',
			networkId: 1, // testnet,
			smartContractUrl: 'https://testnet.snowtrace.io/address/0xA33F22d034b0568200020DFe0646BB9e08494a07'
		};
	}

	return {
		isTestnet: false,
		smartContractAddress: '0x6503d5bac153518A702f84E1E08b9d9AC0941ec1',
		moralisServerUrl: 'https://m44mgge3qhkp.usemoralis.com:2053/server',
		moralisAppId: '0V7LxSeRhT70pjSUH6V9owVdOCw2VNpRNNe4i2U2',
		networkId: 2, // mainnet
		smartContractUrl: 'https://snowtrace.io/address/0x6503d5bac153518A702f84E1E08b9d9AC0941ec1'
	};
}

export const currentInstance = determinInstance();
