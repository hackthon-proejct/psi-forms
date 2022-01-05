import { Fragment } from 'react';

export interface SimpleMarkdownProps {
	text: string;
}

export function SimpleMarkdown(props: SimpleMarkdownProps) {
	const paragraphs = props.text.split(/[\r\n][\r\n]/g);
	let key = 0;

	return (
		<Fragment>
			{paragraphs.map(p => {
				const lines = p.split(/[\r\n]/g);

				const elements: JSX.Element[] = [];
				for (let i = 0; i < lines.length; i++) {
					if (i > 0) {
						elements.push(<br key={key++} />);
					}
					const links = lines[i]
						.split(/(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&//=]*)/i)
						.filter(link => !!link);
					for (let l = 0; l < links.length; l++) {
						if (l % 2 === 0) {
							elements.push(<Fragment key={key++}>{links[l]}</Fragment>);
						} else {
							elements.push(<a href={links[l]} key={key++} target="_blank" rel="noreferrer">{links[l]}</a>);
						}
					}
				}
				return <p key={key++}>{elements}</p>;
			})}
		</Fragment>
	);
}
