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

			{props.files && props.files.length > 0 &&
				<div className="file-list">
					<h4>Attached Files</h4>
					<ul>
					{props.files.map((file, index) =>
						<li key={index}>
							<a key={index} href={file.url} target="_blank" rel="noreferrer">
								{file.name}
							</a>
							{' '}({Math.round(file.size / 1024)} KB)
						</li>)}
					</ul>
				</div>}
		</div>
	);
}
