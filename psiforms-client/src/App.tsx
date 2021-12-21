import { Navigate, Route, Routes } from 'react-router';
import { HashRouter } from 'react-router-dom';

import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Meta } from './components/layout/Meta';
import { WalletContext } from './components/wallet/WalletContext';
import { CreateFormRoute } from './routes/forms/CreateFormRoute';
import { EditBlockchainFormRoute } from './routes/forms/EditBlockchainFormRoute';
import { EditStorageFormRoute } from './routes/forms/EditStorageFormRoute';
import { SubmitFormRoute } from './routes/forms/SubmitFormRoute';
import { HomeRoute } from './routes/home/HomeRoute';
import { MyFormsRoute } from './routes/forms/MyFormsRoute';
import { FormRequestsRoute } from './routes/requests/FormRequestsRoute';
import { MyRequestsRoute } from './routes/requests/MyRequestsRoute';
import { Examples } from './routes/statics/Examples';
import { FAQ } from './routes/statics/FAQ';
import { HowItWorksRoute } from './routes/statics/HowItWorksRoute';
import { TermsRoute } from './routes/statics/TermsRoute';

export function App() {
	return (
		<HashRouter>
			<WalletContext>
				<div className="main">
					<Header />
					{/*<CookiesBar />*/}
					<AppRoutes />
				</div>
				<Footer />
			</WalletContext>
		</HashRouter>
	);
}

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Meta title={null} element={<HomeRoute />} />} />
			<Route path="/create-form" element={<Meta title="Create Form" element={<CreateFormRoute />} />} />
			<Route path="/my-forms" element={<Meta title="My Forms" element={<MyFormsRoute />} />} />
			<Route path="/my-forms/:id/blockchain" element={<Meta title="Edit Earnings of Form" element={<EditBlockchainFormRoute />} />} />
			<Route path="/my-forms/:id/storage" element={<Meta title="Edit Form" element={<EditStorageFormRoute />} />} />

			<Route path="/my-forms/:id/requests" element={<Meta title="Review Ads" element={<FormRequestsRoute />} />} />
			<Route path="/my-requests" element={<Meta title="My Requests" element={<MyRequestsRoute />} />} />
			<Route path="/forms/:id" element={<Meta title="Buy Ad" element={<SubmitFormRoute />} />} />
			<Route path="/terms" element={<Meta title="Terms and Conditions" element={<TermsRoute />} />} />
			<Route path="/how-it-works" element={<Meta title="How it Works" element={<HowItWorksRoute />} />} />
			<Route path="/examples" element={<Meta title="Widget Examples" element={<Examples />} />} />
			<Route path="/faq" element={<Meta title="FAQ" element={<FAQ />} />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
}
