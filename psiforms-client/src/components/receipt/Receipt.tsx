import { FilePointer } from '../../storage/Model';


export interface ReceiptProps {
	message: string;
	files?: FilePointer[];
}

export function Receipt(props: ReceiptProps) {
	return (
		<div className="receipt">
			<p>{props.message}</p>

			{props.files && props.files.map((file, index) =>
				<a key={index} href={file.url}>${file.name}</a>)}
		</div>
	);
}
