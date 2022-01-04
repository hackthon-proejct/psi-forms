import { Fragment, useState } from 'react';

import { UnitsConverter } from '../../../../core/UnitsConverter';
import { BlockchainForm } from '../../Form';

export interface PricingFormGroupProps {
	isReadonly: boolean;
	form: BlockchainForm;
	onChange: (form: BlockchainForm) => void;
}

export function PricingFormGroup(props: PricingFormGroupProps) {

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
				<div className="form-section-header">
					<h3>Availability</h3>
				</div>
				<div className="form-section-body">
					<div className="form-group">
						<label className="checkbox">
							<input type="checkbox" disabled={props.isReadonly} checked={props.form.isEnabled} onChange={onIsEnabledChanged} />
							{' '}Is Form Enabled
						</label>
					</div>
				</div>
			</div>
			<div className="form-section">
				<div className="form-section-header">
					<h3>Pricing</h3>
				</div>
				<div className="form-section-body">
					<div className="form-group">
						<label>Item price *</label>
						<input type="number" value={unitPriceDecimal} readOnly={props.isReadonly} step={0.01} onChange={e => onItemPriceChanged(e.target.value)} />
					</div>

					<div className="form-group">
						<label className="checkbox">
							<input type="checkbox" checked={hasQuantity} disabled={props.isReadonly} onChange={onHasQuantityChanged} />
							{' '}Allow customers to choose a quantity
						</label>
					</div>

					{hasQuantity &&
						<Fragment>
							<div className="form-group">
								<label>Min quantity *</label>
								<input type="number" value={props.form.minQuantity} readOnly={props.isReadonly} onChange={e => onMinQuantityChange(e.target.value)} />
							</div>
							<div className="form-group">
								<label>Max quantity *</label>
								<input type="number" value={props.form.maxQuantity} readOnly={props.isReadonly} onChange={e => onMaxQuantityChange(e.target.value)} />
							</div>
						</Fragment>}
				</div>
			</div>
		</Fragment>
	);
}
