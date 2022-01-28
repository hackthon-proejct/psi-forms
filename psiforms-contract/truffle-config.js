const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
	networks: {
		development: {
			host: "127.0.0.1",
			port: 7545,
			network_id: "*" // Match any network id
		},
		aval: {
			provider: () => new HDWalletProvider('*',
				'https://api.avax.network/ext/bc/C/rpc'),
			from: '0x86D2B5F4AF69458a22d69a7347b2133854933ba4',
			network_id: '*',
			timeoutBlocks: 500,
			skipDryRun: true
		},
		avalTestnet: {
			provider: () => new HDWalletProvider('*',
				'https://api.avax-test.network/ext/bc/C/rpc'),
			from: '0x86D2B5F4AF69458a22d69a7347b2133854933ba4',
			network_id: '*',
			timeoutBlocks: 500,
			skipDryRun: true
		}
	},
	compilers: {
		solc: {
			version: '0.8.11',
			evmVersion: 'istanbul',
			optimizer: {
				enabled: true,
				runs: 200
			}
		}
	}
};
