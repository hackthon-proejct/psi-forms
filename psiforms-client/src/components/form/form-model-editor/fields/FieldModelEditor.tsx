import { FieldModel, FieldType, FileFieldModel, NumberFieldModel, TextFieldModel } from '../../FormModel';
import { FileFieldModelEditor } from './FileFieldModelEditor';
import { NumberFieldModelEditor } from './NumberFieldModelEditor';
import { TextFieldModelEditor } from './TextFieldModelEditor';

export interface FieldModelEditorProps {
	index: number;
	fieldModel: FieldModel;
	onChanged: (index: number, newFieldModel: FieldModel) => void;
	onDeleteClicked: (index: number) => void;
}

export function FieldModelEditor(props: FieldModelEditorProps) {

	function onDeleteClicked() {
		props.onDeleteClicked(props.index);
	}

	function onChanged(nfm: FieldModel) {
		props.onChanged(props.index, nfm);
	}

	function Editor() {
		switch (props.fieldModel.type) {
			case FieldType.text:
				return <TextFieldModelEditor fieldModel={props.fieldModel as TextFieldModel} onChanged={onChanged} />;
			case FieldType.number:
				return <NumberFieldModelEditor fieldModel={props.fieldModel as NumberFieldModel} onChanged={onChanged} />;
			case FieldType.file:
				return <FileFieldModelEditor fieldModel={props.fieldModel as FileFieldModel} onChanged={onChanged} />;
			default:
				throw new Error(`Not supported field type: ${props.fieldModel.type}`);
		};
	}

	return (
		<div className="form-section">
			<h4>{props.fieldModel.type} <button onClick={onDeleteClicked}>x</button></h4>
			{Editor()}
		</div>
	);
}
