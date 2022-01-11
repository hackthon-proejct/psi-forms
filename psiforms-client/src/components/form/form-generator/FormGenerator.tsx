import BN from 'bn.js';
import { Fragment, useEffect } from 'react';
import { useState } from 'react';

import { EmailValidator } from '../../../core/EmailValidator';
import { UnitsConverter } from '../../../core/UnitsConverter';
import { TokenPriceService } from '../../../services/TokenPriceService';
import { FilesContainer } from '../../../storage/FilesContainer';
import { SimpleMarkdown } from '../../SimpleMarkdown';
import { Form } from '../Form';
import { FieldGenerator } from './fields/FieldGenerator';
import { FormData } from './FormData';

export interface FormGeneratorProps {
	form: Form;
	onSave?: (data: FormData) => Promise<void>;
}

interface FieldState {
	value?: string;
	files?: FilesContainer;
	isValid: boolean;
}

export function FormGenerator(props: FormGeneratorProps) {

	const [error, setError] = useState<string>();
	const [isProcessing, setIsProcessing] = useState<boolean>(() => false);
	const [email, setEmail] = useState<string>(() => '');
	const [quantityText, setQuantityText] = useState<string>(() => `${props.form.minQuantity}`);
	const [ethUsdPrice, setEthUsdPrice] = useState<number>();
	const [fieldStates, setFieldStates] = useState<FieldState[]>(() => props.form.fields.map(f => {
		return {
			value: undefined,
			isValid: !f.isRequired
		};
	}));
	const quantity = parseInt(quantityText, 10);
	const totalPrice = props.form.unitPrice
		.mul(new BN(isNaN(quantity) ? 1 : Math.abs(quantity)));
	const totalPriceUsd = ethUsdPrice
		? UnitsConverter.toDecimalETH(totalPrice) * ethUsdPrice
		: null;

	useEffect(() => {
		TokenPriceService.getAvaxUsdPrice()
			.then(setEthUsdPrice)
			.catch(console.error);
	}, []);

	function onFieldValueChanged(value: string | undefined, isValid: boolean, index: number) {
		const values = [...fieldStates];
		values[index] = { value, isValid };
		setFieldStates(values);
	}

	function onFieldFilesChanged(files: FilesContainer, isValid: boolean, index: number) {
		const values = [...fieldStates];
		values[index] = { files, isValid };
		setFieldStates(values);
	}

	async function onSubmit() {
		if (isProcessing) {
			return;
		}
		if (!email || !EmailValidator.validate(email)) {
			setError('E-mail is invalid');
			return;
		}
		if (isNaN(quantity) || quantity < props.form.minQuantity || quantity > props.form.maxQuantity) {
			setError('Quantity is invalid');
			return;
		}
		const firstInvalidFieldIndex = fieldStates.findIndex(s => !s.isValid)
		if (firstInvalidFieldIndex >= 0) {
			const invalidField = props.form.fields[firstInvalidFieldIndex];
			setError(`${invalidField.label} is invalid`);
			return;
		}
		if (!props.onSave) {
			setError('This is preview form only.');
			return;
		}

		const data: FormData = {
			email,
			quantity,
			fields: fieldStates.map((state, index) => {
				const field = props.form.fields[index];
				return {
					type: field.type,
					label: field.label,
					value: state.value,
					files: state.files
				};
			})
		};

		setIsProcessing(true);
		try {
			await props.onSave(data);
		} catch (e) {
			console.error(e);
			setError((e as Error).message);
		}
		setIsProcessing(false);
	}

	return (
		<div className="web-form">
			<div className="web-form-cover"></div>

			<div className="web-form-body">
				<div className="title">
					<h2>{props.form.name}</h2>

					<div className="total-price">
						<em>Total Price:</em>{' '}
						<strong className="value">{UnitsConverter.toDecimalETH(totalPrice)} AVAX</strong>
						{totalPriceUsd !== null &&
							<Fragment>
								{' '}(${totalPriceUsd.toFixed(2)})
							</Fragment>}
					</div>
				</div>

				<div className="description">
					<SimpleMarkdown text={props.form.description} />
				</div>

				<div className="web-form-group">
					<label>E-mail: *</label>
					<input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
				</div>

				{props.form.maxQuantity > 1 &&
					<div className="web-form-group">
						<label>Quantity: *</label>
						<input type="number" value={quantityText} min={props.form.minQuantity} max={props.form.maxQuantity} step={1} onChange={e => setQuantityText(e.target.value)} />
					</div>}

				{props.form.fields.map((fm, index) =>
					<FieldGenerator key={index}
						field={fm}
						value={fieldStates[index]?.value}
						files={fieldStates[index]?.files}
						onValueChanged={(v, iv) => onFieldValueChanged(v, iv, index)}
						onFilesChanged={(f, iv) => onFieldFilesChanged(f, iv, index)} />)}
			</div>
			{error &&
				<p className="web-form-error">Error: {error}</p>}
			<div className="web-form-submit">
				<button onClick={onSubmit} className="btn btn-black">
					{props.form.requireApproval ? 'Pay and Send for Approval' : 'Pay and Send'}
					<i className={isProcessing ?
						'ico ico-ml ico-refresh-white ico-rotating' :
						'ico ico-ml ico-arrow-right-white'} />
				</button>
			</div>
		</div>
	);
}
