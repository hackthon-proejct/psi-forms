import { Link } from "react-router-dom";

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="app-footer">
			<div className="links">
				<ul>
					<li><a href="https://n4no.com" target="_blank" rel="noreferrer">Contact</a></li>
					<li><Link to="/terms">Terms</Link></li>
					<li><a href="https://twitter.com/b4rtaz" target="_blank" rel="noreferrer">Twitter</a></li>
					<li><a href="https://t.me/cryptoadbox" target="_blank" rel="noreferrer">Telegram</a></li>
					<li><a href="https://bscscan.com/address/0xf467541353B4754D5f367B1E8B36A6f2ACc5B056#code" target="_blank" rel="noreferrer">Smart Contract</a></li>
				</ul>
			</div>

			<div className="powered-by">
				<strong>Powered By</strong>
				<img src="images/footer-powered-by.jpg" width={656} height={48} alt="Moralis | IPFS | Avalanche | Covalent" />
			</div>

			<div className="rigths">
				&copy;{year} ΨForms - All rights reserved
			</div>
		</footer>
	);
}
