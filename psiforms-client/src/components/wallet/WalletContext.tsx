import Moralis from 'moralis';
import { createContext, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';

import { determineNetwork, NetworkInfo } from '../../core/NetworkInfo';

export const walletContext = createContext<Wallet | null>(null);

export interface Wallet {
	canAutoConnect(): boolean;
	connect(): Promise<void>;
	disconnect(): Promise<void>
	isConnected(): boolean;
	getAccount(): Account;
	tryGetAccount(): Account | undefined;
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

export function WalletContext(props: { children: JSX.Element[] }) {

	const [account, setAccount] = useState<Account>();

	useEffect(() => {
		async function start() {
			await Moralis.start({
				serverUrl: 'https://dmm1lmrlpitg.usemoralis.com:2053/server',
				appId: 'xNlvWKCOxfltmjKzINOx3HO2Om3NcWkdJNGzfYuo'
			});

			Moralis.Web3.onAccountsChanged(disconnect);
			Moralis.Web3.onChainChanged(connect);

			if (canAutoConnect()) {
				connect();
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
		const networkId = await web3.eth.net.getId();
		const hash = `${ethAddress}|${chainId}|${networkId}`;

		console.log(`chainId = ${chainId}, networkId = ${networkId}`);

		return {
			web3,
			network: determineNetwork(networkId, chainId),
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
			signingMessage: 'Login'
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
			throw new Error('Account is not initialized.');
		}
		return account;
	}

	function tryGetAccount(): Account | undefined {
		return account;
	}

	async function switchNetwork(network: NetworkInfo): Promise<void> {
		// TODO
	}

	return (
		<walletContext.Provider value={{ canAutoConnect, connect, disconnect, isConnected, getAccount, tryGetAccount, switchNetwork }}>
			{props.children}
		</walletContext.Provider>
	);
}
