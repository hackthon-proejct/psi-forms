import { Navigate, Route, Routes } from 'react-router';
import { HashRouter } from 'react-router-dom';

import { AppFooter } from './components/layout/AppFooter';
import { AppHeader } from './components/layout/AppHeader';
import { Meta } from './components/layout/Meta';
import { WebFooter } from './components/layout/WebFooter';
import { WebHeader } from './components/layout/WebHeader';
import { WalletContext } from './components/wallet/WalletContext';
import { CreateFormRoute } from './routes/forms/CreateFormRoute';
import { EditBlockchainFormRoute } from './routes/forms/EditBlockchainFormRoute';
import { EditReceiptRoute } from './routes/forms/EditReceiptRoute';
import { EditStorageFormRoute } from './routes/forms/EditStorageFormRoute';
import { MyFormsRoute } from './routes/forms/MyFormsRoute';
import { PostReceiptRoute } from './routes/forms/PostReceiptRoute';
import { PreReceiptRoute } from './routes/forms/PreReceiptRoute';
import { SubmitFormRoute } from './routes/forms/SubmitFormRoute';
import { HomeRoute } from './routes/home/HomeRoute';
import { FormRequestsRoute } from './routes/requests/FormRequestsRoute';
import { MyRequestsRoute } from './routes/requests/MyRequestsRoute';
import { PendingRequestsRoute } from './routes/requests/PendingRequestsRoute';
import { Examples } from './routes/statics/Examples';
import { FAQ } from './routes/statics/FAQ';
import { HowItWorksRoute } from './routes/statics/HowItWorksRoute';
import { TermsRoute } from './routes/statics/TermsRoute';

export function App() {
	return (
		<HashRouter>
			<WalletContext>
				<AppRoutes />
			</WalletContext>
		</HashRouter>
	);
}

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<AppPage title={null} element={<HomeRoute />} />} />

			<Route path="/create-form" element={<AppPage title="Create Form" element={<CreateFormRoute />} />} />
			<Route path="/forms" element={<AppPage title="My Forms" element={<MyFormsRoute />} />} />
			<Route path="/forms/:id/blockchain" element={<AppPage title="Edit Earnings of Form" element={<EditBlockchainFormRoute />} />} />
			<Route path="/forms/:id/storage" element={<AppPage title="Edit Form" element={<EditStorageFormRoute />} />} />
			<Route path="/forms/:id/receipt" element={<AppPage title="Edit Receipt" element={<EditReceiptRoute />} />} />

			<Route path="/forms/:id" element={<WebPage title="Submit Form" element={<SubmitFormRoute />} />} />
			<Route path="/forms/:id/pre-receipt" element={<WebPage title="Form Submitted" element={<PreReceiptRoute />} />} />
			<Route path="/forms/:id/post-receipt" element={<WebPage title="Form Receipt" element={<PostReceiptRoute />} />} />

			<Route path="/forms/:id/requests" element={<AppPage title="Form Requests" element={<FormRequestsRoute />} />} />
			<Route path="/requests" element={<AppPage title="My Requests" element={<MyRequestsRoute />} />} />
			<Route path="/pending-requests" element={<AppPage title="Pending Requests" element={<PendingRequestsRoute />} />} />

			<Route path="/terms" element={<AppPage title="Terms and Conditions" element={<TermsRoute />} />} />
			<Route path="/how-it-works" element={<AppPage title="How it Works" element={<HowItWorksRoute />} />} />
			<Route path="/examples" element={<AppPage title="Widget Examples" element={<Examples />} />} />
			<Route path="/faq" element={<AppPage title="FAQ" element={<FAQ />} />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
}

function AppPage(props: { title: string | null, element: JSX.Element }) {
	return (
		<div className="app">
			<div className="app-main">
				<AppHeader />
				<Meta title={props.title} element={props.element} />
			</div>
			<AppFooter />
		</div>
	);
}

function WebPage(props: { title: string | null, element: JSX.Element }) {
	return (
		<div className="web">
			<WebHeader />
			{props.element}
			<WebFooter />
		</div>
	);
}
