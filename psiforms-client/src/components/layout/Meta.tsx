import { useEffect } from 'react';

export interface MetaProps {
	title: string | null;
	element: JSX.Element;
}

export function Meta(props: MetaProps) {

	useEffect(() => {
		window.document.title = props.title
			? `${props.title} - PsiForms.com`
			: `PsiForms.com - Online Payment Forms Powered by Blockchain`;
	}, [props.title]);

	return props.element;
}
