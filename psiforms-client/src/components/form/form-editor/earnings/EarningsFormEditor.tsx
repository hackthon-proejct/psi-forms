import { Fragment, useState } from 'react';

import { UnitsConverter } from '../../../../core/UnitsConverter';
import { BlockchainForm } from '../../Form';

export interface EarningsFormEditorProps {
	isReadonly: boolean;
	form: BlockchainForm;
	onChange: (form: BlockchainForm) => void;
}

export function EarningsFormEditor(props: EarningsFormEditorProps) {

	const [hasQuantity, setHasQuantity] = useState(() => props.form.maxQuantity > 1);
	const unitPriceDecimal = UnitsConverter.toDecimalETH(props.form.unitPrice);

	function updateForm(delta: Partial<BlockchainForm>) {
		props.onChange(Object.assign({}, props.form, delta));
	}

	function onIsEnabledChanged() {
		updateForm({ isEnabled: !props.form.isEnabled });
	}

	function onItemPriceChanged(text: string) {
		const value = parseFloat(text);
		if (!isNaN(value)) {
			const unitPrice = UnitsConverter.fromDecimalETH(value);
			updateForm({ unitPrice });
		}
	}

	function onHasQuantityChanged() {
		setHasQuantity(!hasQuantity);
	}

	function onMinQuantityChange(text: string) {
		const minQuantity = parseInt(text, 10);
		if (!isNaN(minQuantity)) {
			updateForm({ minQuantity });
		}
	}

	function onMaxQuantityChange(text: string) {
		const maxQuantity = parseInt(text, 10);
		if (!isNaN(maxQuantity)) {
			updateForm({ maxQuantity });
		}
	}

	return (
		<Fragment>
			<div className="form-section">
				<h4>Availability</h4>

				<div className="form-group">
					<label>Is Enabled *</label>
					<input type="checkbox" checked={props.form.isEnabled} onChange={onIsEnabledChanged} />
				</div>
			</div>
			<div className="form-section">
				<h4>Pricing</h4>

				<div className="form-group">
					<label>Item price *</label>
					<input type="number" value={unitPriceDecimal} readOnly={props.isReadonly} onChange={e => onItemPriceChanged(e.target.value)} />
				</div>

				<div className="form-group">
					<label>
						<input type="checkbox" checked={hasQuantity} disabled={props.isReadonly} onChange={onHasQuantityChanged} />
						Allow customers to choose a quantity
					</label>
				</div>

				{hasQuantity &&
					<div className="row">
						<div className="col">
							<div className="form-group">
								<label>Min quantity *</label>
								<input type="number" value={props.form.minQuantity} readOnly={props.isReadonly} onChange={e => onMinQuantityChange(e.target.value)} />
							</div>
						</div>
						<div className="col">
							<div className="form-group">
								<label>Max quantity *</label>
								<input type="number" value={props.form.maxQuantity} readOnly={props.isReadonly} onChange={e => onMaxQuantityChange(e.target.value)} />
							</div>
						</div>
					</div>}
			</div>
		</Fragment>
	);
}
