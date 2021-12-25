import { FilesContainer } from '../../../../storage/FilesContainer';
import { FileField } from '../../../../storage/Model';
import { StorageClient } from '../../../../storage/StorageClient';

export interface FileFieldGeneratorProps {
	field: FileField;
	files: FilesContainer | undefined;
	onChanged: (files: FilesContainer, isValid: boolean) => void;
}

export function FileFieldGenerator(props: FileFieldGeneratorProps) {
	const files = props.files ?? StorageClient.createFilesContainer();
	const deltas = files.getDeltas();

	function update(newFiles: FilesContainer) {
		props.onChanged(newFiles, true);
	}

	function onUploaded(input: HTMLInputElement) {
		if (!input.files) {
			return;
		}

		const newFiles = files.clone();
		for (let i = 0; i < input.files.length; i++) {
			newFiles.add(input.files[i]);
		}
		update(newFiles);
	}

	function onFileDeleted(fileId: number) {
		const newFiles = files.clone();
		newFiles.delete(fileId);
		update(newFiles);
	}

	return (
		<div className="xform-field">
			<label>{props.field.label}{props.field.isRequired && ' *'}</label>
			<input type="file" onChange={e => onUploaded(e.target)} />

			<ul>
				{deltas.map(delta =>
					<li key={delta.id}>
						{delta.name}
						<button onClick={() => onFileDeleted(delta.id)}>x</button>
					</li>)}
			</ul>
		</div>
	);
}
