import { FilePointer } from '../../storage/Model';
import { SimpleMarkdown } from '../SimpleMarkdown';

export interface ReceiptProps {
	message: string;
	files?: FilePointer[];
}

export function Receipt(props: ReceiptProps) {
	return (
		<div className="receipt">
			<div className="description">
				<SimpleMarkdown text={props.message} />
			</div>

			{props.files &&
				<ul className="files">
				{props.files.map((file, index) =>
					<li>
						<a key={index} href={file.url}>{file.name}</a>
						{' '}({Math.round(file.size / 1024)} KB)
					</li>)}
				</ul>}
		</div>
	);
}
