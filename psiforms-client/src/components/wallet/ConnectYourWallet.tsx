import { Fragment } from 'react';

import { getNetworkInfo, networkInfos } from '../../core/NetworkInfo';
import { useWallet } from './WalletContext';

export interface ConnectYourWalletProps {
	className?: string;
	requiredNetworkId?: number;
}

export function ConnectYourWallet(props: ConnectYourWalletProps) {

	const wallet = useWallet();
	const className = 'wallet-alert ' + (props.className || 'mt');

	if (!wallet.isConnected()) {
		return (
			<div className={className}>
				<div className="warning">
					<i className="ico ico-mr ico-wallet-white" />
					Your wallet is not connected.
				</div>
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
			<div className={className}>
				<div className="warning">
					Sorry, you have connected an unsupported blockchain network. Please switch to <strong>Avalanche Testnet Network</strong>.
					{false && <button className="btn btn-small btn-white" onClick={() => wallet.switchNetwork(networkInfo)}>Switch</button>}
				</div>
			</div>
		)
	}

	return <Fragment />;
}
