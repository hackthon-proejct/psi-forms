const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
	networks: {
		development: {
			host: "127.0.0.1",
			port: 7545,
			network_id: "*" // Match any network id
		},
		avalTestnet: {
			provider: () => new HDWalletProvider('*****',
				'https://api.avax-test.network/ext/bc/C/rpc'),
			from: '0xbAeF084077C2d00fe2CCb9265d8bA5f32A98f7C7',
			network_id: '*',
			timeoutBlocks: 500,
			skipDryRun: true
		}
	},
	compilers: {
		solc: {
			version: "0.8.10",
			optimizer: {
				enabled: true,
				runs: 1000000
			}
		}
	}
};
