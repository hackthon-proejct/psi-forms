import { Fragment, useEffect } from 'react';
import { useLocation } from 'react-router';

export function ScrollToTop() {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return <Fragment />;
}
