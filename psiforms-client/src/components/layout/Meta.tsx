import { useEffect } from 'react';

export interface MetaProps {
	title: string | null;
	element: JSX.Element;
}

export function Meta(props: MetaProps) {

	useEffect(() => {
		window.document.title = (props.title ? (props.title + ' - ') : '') + 'PsiForms.com';
	}, [props.title]);

	return props.element;
}
