import { Fragment } from 'react';

import { getNetworkInfo, networkInfos } from '../../core/NetworkInfo';
import { useWallet } from './WalletContext';

export interface ConnectYourWalletProps {
	requiredNetworkId?: number;
}

export function ConnectYourWallet(props: ConnectYourWalletProps) {

	const wallet = useWallet();

	if (!wallet.isConnected()) {
		return (
			<div className="wallet-alert">
				<i className="ico ico-mr ico-wallet-white" />
				Your wallet is not connected.
			</div>
		);
	}

	const account = wallet.getAccount();

	const requiredNetworkId = (props.requiredNetworkId !== undefined)
		? props.requiredNetworkId
		: (account.network.isSupported ? undefined : networkInfos.find(i => i.isSupported)?.id);

	if (requiredNetworkId !== undefined && account.network.id !== requiredNetworkId) {
		const networkInfo = getNetworkInfo(requiredNetworkId);
		return (
			<div className="wallet-alert">
				<p>
					<i className="ico ico-mr ico-chain-white" />
					Sorry, you have connected unsupported blockchain network.
				</p>
				<button className="btn btn-white" onClick={() => wallet.switchNetwork(networkInfo)}>
					Switch to {networkInfo.name}
				</button>
			</div>
		)
	}

	return <Fragment />;
}
