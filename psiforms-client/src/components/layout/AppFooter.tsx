import { Link } from 'react-router-dom';

import { currentInstance } from '../../storage/InstanceProvider';

export function AppFooter() {
	const year = new Date().getFullYear();

	return (
		<footer className="app-footer">
			<div className="links">
				<ul>
					<li><Link to="/terms">Terms</Link></li>
					<li><a href="https://twitter.com/b4rtaz" target="_blank" rel="noreferrer">Twitter</a></li>
					<li><a href="https://t.me/psiforms" target="_blank" rel="noreferrer">Telegram</a></li>
					<li><a href={currentInstance.smartContractUrl} target="_blank" rel="noreferrer">Smart Contract</a></li>
					<li>
						{currentInstance.isTestnet
							? <a href="https://psiforms.com">MainNet</a>
							: <a href="https://testnet.psiforms.com">TestNet</a>}
					</li>
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
