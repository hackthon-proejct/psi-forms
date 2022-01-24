import { Link } from 'react-router-dom';

import { AppPage } from '../../components/layout/AppPage';

export function Examples() {

	return (
		<AppPage>
			<article className="article">
				<h2>Examples</h2>

				<p>You can find few examples of forms for different purposes below.</p>

				<h4>💾 Digital Files Selling Form</h4>

				<p>This form sells digital files. Pay and immediately receive your digital files.</p>

				<p>&rarr; <Link to="/forms/0x61ac2c9441f6b689153943f483643e1f" target="_blank" rel="noreferrer">Open Digital Files Selling Form</Link></p>

				<h4>📆 Business Proposal Form</h4>

				<p>The form allows submitting a business proposal. An owner of the form may approve or reject this offer. When the form owner approves a offer money will be transferred, otherwise the money will be refunded.</p>

				<p>&rarr; <Link to="/forms/0x56a7f4de63d93c55e1c10eaf6435fd72" target="_blank" rel="noreferrer">Open Business Proposal Form</Link></p>

				<h4>💚 Donation Form</h4>

				<p>This form allows collection donates.</p>

				<p>&rarr; <Link to="/forms/0x7f955d279a6ea7fe8eb9e27f3b0cbcf5" target="_blank" rel="noreferrer">Open Donation Form</Link></p>

				<h4>📠 Anti-Spam Contact Form</h4>

				<p>The price is very low here. Anyone who wants to contact with an owner of the form must pay a symbolic price.</p>

				<p>&rarr; <Link to="/forms/0x7e3e85f70114a4866f77cd6ffee5654c" target="_blank" rel="noreferrer">Open Anti-Spam Contact Form</Link></p>
			</article>
		</AppPage>
	);
}
