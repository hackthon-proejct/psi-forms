import { Navigate, Route, Routes } from 'react-router';
import { HashRouter } from 'react-router-dom';

import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Meta } from './components/layout/Meta';
import { WalletContext } from './components/wallet/WalletContext';
import { SubmitFormRoute } from './routes/submit-form/SubmitFormRoute';
import { CreateFormRoute } from './routes/create-form/CreateFormRoute';
import { EditFormRoute } from './routes/edit-form/EditFormRoute';
import { HomeRoute } from './routes/home/HomeRoute';
import { MyFormsRoute } from './routes/my-forms/MyFormsRoute';
import { MySubmissionsRoute } from './routes/my-submissions/MySubmissionsRoute';
import { FormSubmissionsRoute } from './routes/form-submissions/FormSubmissionsRoute';
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
			<Route path="/my-forms/:id" element={<Meta title="Edit Form" element={<EditFormRoute />} />} />
			<Route path="/my-forms/:id/review" element={<Meta title="Review Ads" element={<FormSubmissionsRoute />} />} />
			<Route path="/my-submissions" element={<Meta title="My Submissions" element={<MySubmissionsRoute />} />} />
			<Route path="/submit-form/:id" element={<Meta title="Buy Ad" element={<SubmitFormRoute />} />} />
			<Route path="/terms" element={<Meta title="Terms and Conditions" element={<TermsRoute />} />} />
			<Route path="/how-it-works" element={<Meta title="How it Works" element={<HowItWorksRoute />} />} />
			<Route path="/examples" element={<Meta title="Widget Examples" element={<Examples />} />} />
			<Route path="/faq" element={<Meta title="FAQ" element={<FAQ />} />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
}
