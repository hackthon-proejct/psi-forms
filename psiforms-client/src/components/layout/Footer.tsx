import { Link } from "react-router-dom";

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="app-footer">
			<div className="links">
				<a href="https://bscscan.com/address/0xf467541353B4754D5f367B1E8B36A6f2ACc5B056#code" target="_blank" rel="noreferrer">Smart Contract</a>
				<Link to="/terms">Terms and Conditions</Link>
				<a href="https://twitter.com/b4rtaz" target="_blank" rel="noreferrer">Twitter</a>
				<a href="https://t.me/cryptoadbox" target="_blank" rel="noreferrer">Telegram</a>
				<a href="https://n4no.com" target="_blank" rel="noreferrer">Contact</a>
			</div>
			<div className="rigths">
				<p>&copy;{year} All rights reserved</p>
				<p>by <a href="https://n4no.com" target="_blank" rel="noreferrer">N4NO</a></p>
			</div>
		</footer>
	);
}
