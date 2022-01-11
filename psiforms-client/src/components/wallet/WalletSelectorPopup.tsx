
export type WalletSelectorPopupResult = 'metamask';

export interface WalletSelectorPopupProps {
	onClosed: (result?: WalletSelectorPopupResult) => void;
}

export function WalletSelectorPopup(props: WalletSelectorPopupProps) {
	return (
		<div className="tiny-popup">
			<h4>Sellect Your Wallet</h4>

			<div className="simple-row">
				<button className="wallet-provider-logo metamask" onClick={() => props.onClosed('metamask')}><strong>MetaMask</strong></button>
			</div>

			<div className="simple-row">
				<button className="btn btn-black" onClick={() => props.onClosed()}>Cancel</button>
			</div>
		</div>
	);
}
