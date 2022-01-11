import { WalletConnector } from '../wallet/WalletConnector';

export function WebHeader() {
	return (
		<header className="web-header">
			<WalletConnector canEditProfile={false} />
		</header>
	);
}
