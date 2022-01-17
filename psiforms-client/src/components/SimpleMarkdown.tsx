import { Fragment } from 'react';

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

export interface SimpleMarkdownProps {
	text: string;
}

export function SimpleMarkdown(props: SimpleMarkdownProps) {
	const paragraphs = props.text
		.replace(/(\r|\n|\r\n)/, '\n')
		.split(/\n\n+/g);
	let key = 0;

	return (
		<Fragment>
			{paragraphs.map(p => {
				const lines = p.split(/\n/g);

				const elements: JSX.Element[] = [];
				for (let i = 0; i < lines.length; i++) {
					if (i > 0) {
						elements.push(<br key={key++} />);
					}

					const parts = lines[i].split(' ');
					for (let p = 0; p < parts.length; p++) {
						const part = parts[p];
						if (p > 0) {
							elements.push(<Fragment key={key++}>{' '}</Fragment>);
						}
						if (URL_REGEX.test(part)) {
							elements.push(<a href={part} key={key++} target="_blank" rel="noreferrer">{part}</a>);
						} else {
							elements.push(<Fragment key={key++}>{part}</Fragment>);
						}
					}
				}
				return <p key={key++}>{elements}</p>;
			})}
		</Fragment>
	);
}
