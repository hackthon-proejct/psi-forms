import { Link } from 'react-router-dom';

import { WalletConnector } from '../wallet/WalletConnector';

export function AppHeader() {
	return (
		<header className="app-header">
			<div className="header">
				<div className="logo">
					<h1><Link to="/">ΨForms</Link></h1>
				</div>
				<nav className="nav">
					<ul>
						<li><Link to="/forms">My Forms</Link></li>
						<li><Link to="/pending-requests">Pending Requests</Link></li>
						<li><Link to="/requests">My Requests</Link></li>
					</ul>
				</nav>
				<aside className="session">
					<WalletConnector canEditProfile={true} />
				</aside>
			</div>
		</header>
	);
}
