import { Link } from 'react-router-dom';

import { AppPage } from '../../components/layout/AppPage';

export function Examples() {

	return (
		<AppPage>
			<article className="article">
				<h2>Examples</h2>

				<p>Online forms are powerful tools for creating an online business. You can find few examples of different businesses below. Of course you may create your own profitable idea. Start your business today!</p>

				<h4>💾 Digital Products Selling Form</h4>

				<p>This form sells digital products like books, tutorials, courses, databases or music. Your customer will receive digital files automatically after a successful crypto payment.</p>

				<p>&rarr; <Link to="/forms/0x61ac2c9441f6b689153943f483643e1f" target="_blank" rel="noreferrer">Buy Database of Best Startups</Link></p>

				<h4>📆 Business Proposal Form</h4>

				<p>This form allows submitting a business offer. An owner of the form may approve or reject this offer. When the form owner approves a offer money will be transferred, otherwise the money will be refunded.</p>

				<p>&rarr; <Link to="/forms/0x56a7f4de63d93c55e1c10eaf6435fd72" target="_blank" rel="noreferrer">Buy Ad on My Youtube Channel</Link></p>

				<h4>💚 Donation Form</h4>

				<p>This form allows collecting donations. Donors also may add an extra message to a recipient.</p>

				<p>&rarr; <Link to="/forms/0x7f955d279a6ea7fe8eb9e27f3b0cbcf5" target="_blank" rel="noreferrer">Donate Me</Link></p>

				<h4>🙏 Paid Support Form</h4>

				<p>This form allows selling different kind support. You may selling finance advices, business help or anything what is valuable to your customers.</p>

				<p>&rarr; <Link to="/forms/0x2799d8bb65f68afd1b4525c1f7b85f08" target="_blank" rel="noreferrer">Rate My Project</Link></p>

				<h4>📠 Anti-Spam Contact Form</h4>

				<p>This form has a very low price. Anyone who wants to contact with an owner of the form must pay a symbolic price. It's kind of anti-spam system.</p>

				<p>&rarr; <Link to="/forms/0x7e3e85f70114a4866f77cd6ffee5654c" target="_blank" rel="noreferrer">Contact Us</Link></p>
			</article>
		</AppPage>
	);
}
