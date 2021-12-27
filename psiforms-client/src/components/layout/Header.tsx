import { Link } from 'react-router-dom';
import { WalletConnector } from './WalletConnector';

export function Header() {

	return (
		<header className="app-header">
			<div className="header">
				<h1>
					<Link to="/">
						ΨForms
					</Link>
				</h1>

				<nav>
					<Link to="/create-form">Create Form</Link>
					<Link to="/forms">My Forms</Link>
					<Link to="/pending-requests">Pending Requests</Link>
					<Link to="/requests">My Requests</Link>
				</nav>
			</div>
			<aside className="aside">
				<WalletConnector />
			</aside>
		</header>
	);
}
