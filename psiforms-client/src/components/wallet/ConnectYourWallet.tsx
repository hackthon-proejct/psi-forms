import { Fragment } from 'react';

import { networkInfos } from './NetworkInfo';
import { useWallet } from './WalletContext';

export interface ConnectYourWalletProps {
	className?: string;
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

	if (!account.network.isSupported) {
		const firstSupportedNetwork = networkInfos.filter(i => i.isSupported)[0];

		return (
			<div className={className}>
				<div className="warning">
					Sorry, you have connected an unsupported blockchain network.
					Please switch to <button onClick={() => wallet.switchNetwork(firstSupportedNetwork)} className="connect">{firstSupportedNetwork.name}</button>.
				</div>
			</div>
		)
	}

	return <Fragment />;
}
