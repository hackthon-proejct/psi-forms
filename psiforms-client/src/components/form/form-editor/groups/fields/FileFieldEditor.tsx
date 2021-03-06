import { Fragment } from 'react';

import { Field, FileField, FileType } from '../../../../../storage/Model';
import { fileTypes } from '../../../Form';

export interface FileFieldEditorProps {
	field: FileField;
	onChanged: (newField: Field) => void;
}

export function FileFieldEditor(props: FileFieldEditorProps) {

	function updateField(delta: Partial<FileField>) {
		const nfm = Object.assign({}, props.field, delta);
		props.onChanged(nfm);
	}

	return (
		<Fragment>
			<div className="form-group">
				<label>Label: *</label>
				<input type="text" value={props.field.label} onChange={e => updateField({ label: e.target.value })} />
			</div>
			<div className="form-group">
				<label>Is required:</label>
				<input type="checkbox" checked={props.field.isRequired} onChange={() => updateField({ isRequired: !props.field.isRequired })} />
			</div>
			<div className="form-group" style={{ display: 'none' }}>
				<label>File type:</label>
				<select value={props.field.fileType} onChange={e => updateField({ fileType: e.target.value as FileType })}>
					{fileTypes.map(fileType =>
						<option key={fileType} value={fileType}>{fileType}</option>)}
				</select>
			</div>
		</Fragment>
	);
}
