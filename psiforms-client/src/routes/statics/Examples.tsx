import { AppPage } from '../../components/layout/AppPage';

export function Examples() {

	function buildFormHref(formId: string) {
		return `https://testnet.psiforms.com/forms/${formId}`;
	}

	return (
		<AppPage>
			<article className="article">
				<h2>Examples</h2>

				<p>Online forms are powerful tools for creating an online business. You can find few examples of different businesses below. Of course you may create your own profitable idea. Start your business today!</p>

				<p>All forms below are published on TestNet. You may test them for free!</p>

				<h4>💾 Digital Products Selling Form</h4>

				<p>This form sells digital products like books, tutorials, courses, databases or music. Your customer will receive digital files automatically after a successful crypto payment.</p>

				<p>&rarr; <a href={buildFormHref('0x906b7a971ef880e88ee9f438952664c3')} target="_blank" rel="noreferrer">Buy Database of Best Startups</a></p>

				<h4>📆 Business Proposal Form</h4>

				<p>This form allows submitting a business offer. An owner of the form may approve or reject this offer. When the form owner approves a offer money will be transferred, otherwise the money will be refunded.</p>

				<p>&rarr; <a href={buildFormHref('0x7eed8eff9b8c16819b03c516071f569f')} target="_blank" rel="noreferrer">Buy Ad on My Youtube Channel</a></p>

				<h4>💚 Donation Form</h4>

				<p>This form allows collecting donations. Donors also may add an extra message to a recipient.</p>

				<p>&rarr; <a href={buildFormHref('0x5c7666214b6dc81638c55ae4cab10bb1')} target="_blank" rel="noreferrer">Donate Me</a></p>

				<h4>🙏 Paid Support Form</h4>

				<p>This form allows selling different kind support. You may selling finance advices, business help or anything what is valuable to your customers.</p>

				<p>&rarr; <a href={buildFormHref('0x42af9978f95537543d24a6e7ab687103')} target="_blank" rel="noreferrer">Rate My Project</a></p>

				<h4>📠 Anti-Spam Contact Form</h4>

				<p>This form has a very low price. Anyone who wants to contact with an owner of the form must pay a symbolic price. It's kind of anti-spam system.</p>

				<p>&rarr; <a href={buildFormHref('0xb0e699040441242efb2a7f8725aba051')} target="_blank" rel="noreferrer">Contact Us</a></p>
			</article>
		</AppPage>
	);
}
