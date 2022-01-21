import { Link } from 'react-router-dom';

export function AppFooter() {
	const year = new Date().getFullYear();

	return (
		<footer className="app-footer">
			<div className="links">
				<ul>
					<li><Link to="/terms">Terms</Link></li>
					<li><a href="https://twitter.com/b4rtaz" target="_blank" rel="noreferrer">Twitter</a></li>
					<li><a href="https://t.me/psiforms" target="_blank" rel="noreferrer">Telegram</a></li>
					<li><a href="https://testnet.snowtrace.io/address/0x119306d5d3B2a59ef369B5E13363AaDf6a9bb9dC" target="_blank" rel="noreferrer">Smart Contract</a></li>
					<li><a href="https://t.me/b4rtaz" target="_blank" rel="noreferrer">Contact</a></li>
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
