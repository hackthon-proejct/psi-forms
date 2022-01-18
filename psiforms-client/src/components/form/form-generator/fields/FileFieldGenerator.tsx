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
		input.value = '';
	}

	function onFileDeleted(fileId: number) {
		const newFiles = files.clone();
		newFiles.delete(fileId);
		update(newFiles);
	}

	return (
		<div className="web-form-group">
			<label>{props.field.label}:{props.field.isRequired && ' *'}</label>
			<input type="file" onChange={e => onUploaded(e.target)} />

			{deltas.length > 0 &&
				<ul className="file-list">
					{deltas.map(delta =>
						<li key={delta.id}>
							{delta.name}{' '}
							<button onClick={() => onFileDeleted(delta.id)} className="btn btn-small btn-gray" title="Delete">
								<i className="ico ico-close-black" />
							</button>
						</li>)}
				</ul>}
		</div>
	);
}
