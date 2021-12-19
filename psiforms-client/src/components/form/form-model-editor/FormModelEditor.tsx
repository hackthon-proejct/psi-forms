import { useState } from 'react';

import { UnitsConverter } from '../../../core/UnitsConverter';
import { useWallet } from '../../wallet/WalletContext';
import { FormGenerator } from '../form-generator/FormGenerator';
import { FieldModel, FieldType, FormModel } from '../FormModel';
import { FieldModelEditor } from './fields/FieldModelEditor';
import { initializeField, initializeNewForm } from './FormModelInitializator';

export interface FormModelEditorProps {
	saveHandler: (fm: FormModel) => Promise<boolean>;
	isEdit: boolean;
	data?: FormModel;
}

export function FormModelEditor(props: FormModelEditorProps) {
	const wallet = useWallet();
	const account = wallet.isConnected()
		? wallet.getAccount()
		: null;

	const [isProcessing, setIsProcessing] = useState<boolean>(() => false);
	const [error, setError] = useState<string>();

	const [formModel, setFormModel] = useState<FormModel>(() => props.data ?? initializeNewForm());
	const [hasQuantity, setHasQuantity] = useState(() => formModel.maxQuantity > 1);
	const isReadonly = !account || isProcessing;
	const unitPriceDecimal = UnitsConverter.toDecimal(formModel.itemPrice, 18);

	function updateFormModel(delta: Partial<FormModel>) {
		setFormModel(Object.assign({}, formModel, delta));
	}

	function onHasQuantityChanged() {
		setHasQuantity(!hasQuantity);
	}

	function onItemPriceChanged(text: string) {
		const value = parseFloat(text);
		updateFormModel({
			itemPrice: UnitsConverter.fromDecimal(value, 18)
		});
	}

	function onFieldModelChanged(index: number, fieldModel: FieldModel) {
		const fields = [...formModel.fields];
		fields[index] = fieldModel;
		updateFormModel({ fields });
	}

	function deleteFieldClicked(index: number) {
		const fields = formModel.fields.filter((_, i) => i !== index);
		updateFormModel({ fields });
	}

	function addFieldClicked(type: FieldType) {
		const field = initializeField(type);
		const fields = formModel.fields.concat([field]);
		updateFormModel({ fields });
	}

	async function onSubmited() {
		if (isProcessing) {
			return;
		}
		if (!account) {
			setError('Please connect your wallet.');
			return;
		}

		setIsProcessing(true);
		try {
			await props.saveHandler(formModel);
		} catch (e) {
			setError((e as Error).message);
		} finally {
			setIsProcessing(false);
		}
	}

	return (
		<section className="form">
			<h2>Create Form</h2>

			<div className="form-section">
				<div className="form-group">
					<label>Name *</label>
					<input type="text" value={formModel.name} readOnly={isReadonly} onChange={e => updateFormModel({ name: e.target.value })} />
				</div>

				<div className="form-group">
					<label>Description *</label>
					<input type="text" value={formModel.description} readOnly={isReadonly} onChange={e => updateFormModel({ description: e.target.value })} />
				</div>
			</div>

			<div className="form-section">
				<h4>Pricing</h4>

				<div className="form-group">
					<label>Item price *</label>
					<input type="number" value={unitPriceDecimal} readOnly={isReadonly} onChange={e => onItemPriceChanged(e.target.value)} />
				</div>

				<div className="form-group">
					<label>
						<input type="checkbox" checked={hasQuantity} disabled={isReadonly} onChange={onHasQuantityChanged} />
						Allow customers to choose a quantity
					</label>
				</div>

				{hasQuantity &&
					<div className="row">
						<div className="col">
							<div className="form-group">
								<label>Min quantity *</label>
								<input type="number" value={formModel.minQuantity} readOnly={isReadonly} onChange={e => updateFormModel({ minQuantity: parseInt(e.target.value, 10) })} />
							</div>
						</div>
						<div className="col">
							<div className="form-group">
								<label>Max quantity *</label>
								<input type="number" value={formModel.maxQuantity} readOnly={isReadonly} onChange={e => updateFormModel({ maxQuantity: parseInt(e.target.value, 10) })} />
							</div>
						</div>
					</div>}
			</div>

			<div className="form-section">
				<h4>Approval</h4>

				<div className="form-group">
					<label>
						<input type="radio" checked={!formModel.approval} disabled={isReadonly} onChange={() => updateFormModel({ approval: false })} />
						No approval, transfer money to me immediately
					</label>
					<label>
						<input type="radio" checked={formModel.approval} disabled={isReadonly} onChange={() => updateFormModel({ approval: true })} />
						Need approval, transfer money to me after approval
					</label>
				</div>
			</div>

			<div className="form-section">
				<h4>Custom fields</h4>

				{formModel.fields.map((fm, index) =>
					<FieldModelEditor key={index} index={index} fieldModel={fm} onChanged={onFieldModelChanged} onDeleteClicked={deleteFieldClicked} />)}

				<div>
					<button className="btn btn-black" onClick={() => addFieldClicked(FieldType.text)}>Add Text</button>
					<button className="btn btn-black" onClick={() => addFieldClicked(FieldType.number)}>Add Number</button>
					<button className="btn btn-black" onClick={() => addFieldClicked(FieldType.file)}>Add File</button>
				</div>
			</div>

			{error && <p className="form-error">Error: {error}</p>}

			<div className="form-submit">
				<button className="btn btn-black btn-large" onClick={onSubmited}>
					{props.isEdit ? 'Update AdBox' : 'Create AdBox'}
					{isProcessing && <i className="ico ico-reload-white ico-ml ico-rotating" />}
				</button>
			</div>

			<h2>Preview</h2>

			<FormGenerator formModel={formModel} />
		</section>
	);
}
