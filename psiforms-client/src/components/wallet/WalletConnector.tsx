import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router';

import { HexFormatter } from '../../core/HexFormatter';
import { useWallet } from './WalletContext';
import { WalletMenuPopup, WalletMenuPopupResult } from './WalletMenuPopup';
import { WalletSelectorPopup, WalletSelectorPopupResult } from './WalletSelectorPopup';

export interface WalletConnectorProps {
	canEditProfile: boolean;
}

export function WalletConnector(props: WalletConnectorProps) {
	const navigate = useNavigate();
	const wallet = useWallet();

	const [isWsOpened, setIsWsOpened] = useState(() => false);
	const [isMenuOpened, setIsMenuOpened] = useState(() => false);

	async function tryConnect() {
		try {
			await wallet.connect();
		} catch (e) {
			alert('Error: ' + (e as Error).message);
		}
	}

	async function onWalletClicked() {
		if (!wallet.isConnected()) {
			setIsWsOpened(true);
		} else {
			setIsMenuOpened(true);
		}
	}

	async function onWaletSelectorPopupClosed(result?: WalletSelectorPopupResult) {
		if (result === 'metamask') {
			await tryConnect();
		}
		setIsWsOpened(false);
	}

	async function onMenuPopupClosed(result?: WalletMenuPopupResult) {
		setIsMenuOpened(false);
		switch (result) {
			case 'disconnect':
				await wallet.disconnect();
				break;
			case 'editProfile':
				navigate('/my-creator-profile');
				break;
		}
	}

	const isConnected = wallet.isConnected();
	return (
		<Fragment>
			{isWsOpened &&
				<WalletSelectorPopup onClosed={onWaletSelectorPopupClosed} />}
			{isConnected &&
				<Fragment>
					{isMenuOpened && <WalletMenuPopup canEditProfile={props.canEditProfile} onClosed={onMenuPopupClosed} />}
					<button className="btn btn-gray">
						<i className="ico ico-mr ico-chain-black" />
						{wallet.getAccount().network.name}
					</button>
					{' '}
				</Fragment>}
			<button className="btn btn-black" onClick={onWalletClicked}>
				<i className="ico ico-mr ico-wallet-white" />
				{isConnected ? HexFormatter.format(wallet.getAccount().address) : 'Connect wallet'}
			</button>
		</Fragment>
	);
}
