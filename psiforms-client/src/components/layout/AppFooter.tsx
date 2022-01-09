import { Link } from 'react-router-dom';

export function AppFooter() {
	const year = new Date().getFullYear();

	return (
		<footer className="app-footer">
			<div className="links">
				<ul>
					<li><a href="https://n4no.com" target="_blank" rel="noreferrer">Contact</a></li>
					<li><Link to="/terms">Terms</Link></li>
					<li><a href="https://twitter.com/b4rtaz" target="_blank" rel="noreferrer">Twitter</a></li>
					<li><a href="https://t.me/psiforms" target="_blank" rel="noreferrer">Telegram</a></li>
					<li><a href="https://testnet.avascan.info/blockchain/c/address/0x8A367DF709AfE175D58015ECFbe3bA38Ff063008/contract" target="_blank" rel="noreferrer">Smart Contract</a></li>
				</ul>
			</div>

			<div className="providers">
				<strong>Powered By</strong>
				<a href="https://moralis.io/" className="provider moralis" target="_blank" rel="noreferrer">Moralis</a>
				<a href="https://ipfs.io/" className="provider ipfs" target="_blank" rel="noreferrer">IPFS</a>
				<a href="https://www.avax.network/" className="provider avalanche" target="_blank" rel="noreferrer">Avalanche</a>
				<a href="https://www.covalenthq.com/" className="provider covalent" target="_blank" rel="noreferrer">Covalent</a>
			</div>

			<div className="rigths">
				&copy;{year} PsiForms.com - All rights reserved
			</div>
		</footer>
	);
}
