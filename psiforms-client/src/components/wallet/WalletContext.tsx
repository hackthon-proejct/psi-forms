import Moralis from 'moralis';
import { createContext, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';

import { currentInstance } from '../../storage/InstanceProvider';
import { determineNetwork, NetworkInfo } from './NetworkInfo';

const walletContext = createContext<Wallet | null>(null);

export interface Wallet {
	canAutoConnect(): boolean;
	connect(): Promise<void>;
	disconnect(): Promise<void>
	isConnected(): boolean;
	getAccount(): Account;
	tryGetAccount(): Account | undefined;
	isNetworkSupported(id: number): boolean;
	switchNetwork(network: NetworkInfo): Promise<void>;
}

export interface Account {
	web3: Web3;
	network: NetworkInfo;
	address: string;
	hash: string;
}

export function useWallet(): Wallet {
	const wallet = useContext(walletContext);
	if (!wallet) {
		throw new Error('Cannot find wallet context');
	}
	return wallet;
}

export function WalletContext(props: { children: JSX.Element }) {

	const [account, setAccount] = useState<Account>();

	useEffect(() => {
		async function start() {
			await Moralis.start({
				serverUrl: currentInstance.moralisServerUrl,
				appId: currentInstance.moralisAppId
			});

			Moralis.Web3.onAccountsChanged(disconnect);
			Moralis.Web3.onChainChanged(connect);

			if (canAutoConnect()) {
				try {
					await connect();
				} catch (e) {
					console.error(e);
				}
			}
		}
		start();
	}, []);

	async function tryReadAccount(): Promise<Account | null> {
		const web3 = await Moralis.Web3.enableWeb3();
		const user = Moralis.User.current();
		if (!user) {
			return null;
		}

		const ethAddress = user.get('ethAddress');
		const chainId = await web3.eth.getChainId();
		const hash = `${ethAddress}|${chainId}`;

		console.log(`ethAddress = ${ethAddress}, chainId = ${chainId}`);

		return {
			web3,
			network: determineNetwork(chainId),
			address: ethAddress,
			hash
		};
	}

	function login(newAccount: Account) {
		localStorage['autoConnect'] = '1';
		setAccount(newAccount);
	}

	function canAutoConnect() {
		return localStorage['autoConnect'] === '1';
	}

	async function connect(): Promise<void> {
		const currentAccount = await tryReadAccount();
		if (currentAccount) {
			login(currentAccount);
			return;
		}

		const user = await Moralis.Web3.authenticate({
			signingMessage: 'PsiForms Authentication'
		});
		if (user) {
			const account = await tryReadAccount();
			if (account) {
				login(account);
			}
		}
	}

	async function disconnect(): Promise<void> {
		localStorage['autoConnect'] = '0';
		await Moralis.User.logOut();
		setAccount(undefined);
	}

	function isConnected(): boolean {
		return !!account;
	}

	function getAccount(): Account {
		if (!account) {
			throw new Error('Wallet is not connected.');
		}
		return account;
	}

	function tryGetAccount(): Account | undefined {
		return account;
	}

	function isNetworkSupported(networkId: number): boolean {
		return currentInstance.networkId === networkId;
	}

	async function switchNetwork(network: NetworkInfo): Promise<void> {
		const account = getAccount();
		const provider = account.web3.currentProvider as { request: (p: any) => Promise<void>; };
		const chainIdHex = '0x' + network.chainId.toString(16);
		try {
			await provider.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: chainIdHex }]
			});
		} catch (e0) {
			console.error(e0);
			if ((e0 as any).code !== 4902) {
				return;
			}
			try {
				provider.request({
					method: 'wallet_addEthereumChain',
					params: [
						{
							chainId: chainIdHex,
							chainName: network.name,
							rpcUrls: [network.rpcUrl],
							nativeCurrency: {
								name: network.ethSymbol,
								symbol: network.ethSymbol,
								decimals: network.ethDecimals,
							}
						}
					]
				});
			} catch (e1) {
				console.error(e1);
			}
		}
	}

	return (
		<walletContext.Provider value={{ canAutoConnect, connect, disconnect, isConnected, getAccount, tryGetAccount, isNetworkSupported, switchNetwork }}>
			{props.children}
		</walletContext.Provider>
	);
}
