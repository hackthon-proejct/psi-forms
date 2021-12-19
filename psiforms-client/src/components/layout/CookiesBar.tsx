import { Fragment, useState } from "react";

export function CookiesBar() {

	const [isOpened, setIsOpened] = useState(() => localStorage['cookies'] !== '0');

	function onOkClicked() {
		localStorage['cookies'] = '0';
		setIsOpened(false);
	}

	if (!isOpened) {
		return <Fragment />
	}
	return (
		<div className="cookies-bar">
			We use cookies to analyze traffic.
			{' '}
			<button className="btn btn-black btn-ml" onClick={onOkClicked}>Ok</button>
		</div>
	);
}
