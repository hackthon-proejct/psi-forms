export type WalletMenuPopupResult = 'editProfile' | 'disconnect';

export interface WalletMenuPopupProps {
	canEditProfile: boolean;
	onClosed: (result?: WalletMenuPopupResult) => void;
}

export function WalletMenuPopup(props: WalletMenuPopupProps) {
	return (
		<div className="tiny-popup">
			<h4>Your Wallet</h4>

			{props.canEditProfile &&
				<div className="simple-row">
					<button className="btn btn-gray" onClick={() => props.onClosed('editProfile')}>Edit Profile</button>
				</div>}
			<div className="simple-row">
				<button className="btn btn-gray" onClick={() => props.onClosed('disconnect')}>Disconnect</button>
			</div>

			<div className="simple-row">
				<button className="btn btn-black" onClick={() => props.onClosed()}>Cancel</button>
			</div>
		</div>
	);
}
