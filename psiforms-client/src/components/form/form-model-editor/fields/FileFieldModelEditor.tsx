import { Fragment } from 'react';

import { FieldModel, FileFieldModel, FileType, fileTypes } from '../../FormModel';

export interface FileFieldModelEditorProps {
	fieldModel: FileFieldModel;
	onChanged: (newFieldModel: FieldModel) => void;
}

export function FileFieldModelEditor(props: FileFieldModelEditorProps) {

	function updateFieldModel(delta: Partial<FileFieldModel>) {
		const nfm = Object.assign({}, props.fieldModel, delta);
		props.onChanged(nfm);
	}

	return (
		<Fragment>
			<div className="row">
				<div className="col">
					<div className="form-group">
						<label>Label: *</label>
						<input type="text" value={props.fieldModel.label} onChange={e => updateFieldModel({ label: e.target.value })} />
					</div>
				</div>
				<div className="col">
					<div className="form-group">
						<label>Is required:</label>
						<input type="checkbox" checked={props.fieldModel.isRequired} onChange={() => updateFieldModel({ isRequired: !props.fieldModel.isRequired })} />
					</div>
				</div>
			</div>
			<div className="form-group">
				<label>File type:</label>
				<select value={props.fieldModel.fileType} onChange={e => updateFieldModel({ fileType: e.target.value as FileType })}>
					{fileTypes.map(fileType =>
						<option key={fileType} value={fileType}>{fileType}</option>)}
				</select>
			</div>
		</Fragment>
	);
}
