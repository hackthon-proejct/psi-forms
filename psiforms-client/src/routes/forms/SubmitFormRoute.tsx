import BN from 'bn.js';
import { ChangeEvent, Fragment, useCallback, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Web3 from 'web3';

import { Loader, useLoader } from '../../components/layout/Loader';
import { YesNoSelect } from '../../components/layout/YesNoSelect';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { useWallet } from '../../components/wallet/WalletContext';
import { ApiClient } from '../../core/ApiClient';
import { AdBoxDto } from '../../core/ApiModel';
import { getNetworkInfo } from '../../core/NetworkInfo';
import { UnitsConverter } from '../../core/UnitsConverter';

export function SubmitFormRoute() {
	const { id } = useParams();
	const adBoxId = id as string;
	const wallet = useWallet();
	const account = wallet.isConnected()
		? wallet.getAccount()
		: null;

	const [url, setUrl] = useState<string>(() => '');
	const [quantity, setQuantity] = useState<number>(() => 1);
	const [email, setEmail] = useState<string>(() => '');
	const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(() => false);

	const [error, setError] = useState<string>();
	const [isProcessing, setIsProcessing] = useState<boolean>(() => false);
	const [navigateTo, setNavigateTo] = useState<string>();

	const state = useLoader<AdBoxDto>(
		useCallback(async () => {
			const a = await ApiClient.getAdBox(adBoxId);
			if (a.isEnabled) {
				setQuantity(a.minQuantity);
			} else {
				setError('AdBox is disabled.');
			}
			return a;
		}, [adBoxId]));
	const adBox = state.value;

	const value = adBox
		? Web3.utils.toBN(adBox.unitPrice).mul(new BN(quantity))
		: null;

	async function onFileAttached(e: ChangeEvent<HTMLInputElement>) {
	}

	async function onSubmited() {
		if (!value || !adBox || isProcessing) {
			return;
		}
		if (!account) {
			setError('Your wallet is not connected.');
			return;
		}
		if (adBox.networkId !== account.network.id) {
			setError('Connected network is wrong.');
			return;
		}
		if (!url) {
			setError('Link URL is empty.');
			return;
		}
		if (!isTermsAccepted) {
			setError('Please accept terms and conditions.');
			return;
		}

		setIsProcessing(true);
		setError(undefined);

		try {

			setNavigateTo('/ads');
		} catch (e) {
			setIsProcessing(false);
			setError((e as Error).message);
		}
	}

	if (navigateTo) {
		return <Navigate to={navigateTo} />
	}
	return (
		<Loader state={state} element={(adBox => {
			const adNetworkInfo = getNetworkInfo(adBox.networkId);

			if (!value) {
				throw new Error('Invalid state');
			}
			return (
				<Fragment>
					<ConnectYourWallet requiredNetworkId={adBox.networkId} />

					<section className="section form">
						<h2>Buy Ad in "{adBox.name}"</h2>

						{adBox.websiteUrl &&
							<p className="preamble">Buy Ad on {new URL(adBox.websiteUrl).hostname}</p>}

						<div className="row">
							<div className="col">
								<div className="form-group">
									<label>Link URL *</label>
									<input type="text" value={url} name="url" readOnly={isProcessing} onChange={e => setUrl(e.target.value)} />
								</div>
							</div>
							<div className="col">
								<div className="form-group">
									<label>E-mail for Notifications <em>(optional)</em></label>
									<input type="text" value={email} name="email" maxLength={128} readOnly={isProcessing} onChange={e => setEmail(e.target.value)} />
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col">
								<div className="form-group">
									<label>
										Display Time * <em>(hours)
										(minimum = {adBox.minQuantity}, maximum={adBox.maxQuantity})</em>
									</label>
									<input type="number" value={quantity} min={adBox.minQuantity} max={adBox.maxQuantity} readOnly={isProcessing} onChange={e => setQuantity(parseInt(e.target.value, 10))} />
								</div>
							</div>
							<div className="col">
								<div className="form-group">
									<label>
										Image * {' '}
									</label>
									<input type="file" onChange={onFileAttached} />
								</div>
							</div>
						</div>


						<div className="form-group">
							<label>
								Do you accept <Link to="/terms" target="_blank">service terms and conditions</Link>? *
							</label>
							<YesNoSelect value={isTermsAccepted} isDisabled={isProcessing} onChange={v => setIsTermsAccepted(v)} />
						</div>

						<div className="form-group">
							<label>Final Price</label>
							<div className="final-price">
								<strong>{UnitsConverter.toDecimal(value, adNetworkInfo.ethDecimals).toFixed(6)} {adNetworkInfo.ethSymbol}</strong>
								{' + '}transaction fee
							</div>
						</div>

						{error && <p className="form-error">Error: {error}</p>}

						<div className="form-submit">
							<button className="btn btn-black btn-large" onClick={onSubmited}>
								Send for Approval
								{isProcessing && <i className="ico ico-reload-white ico-ml ico-rotating" />}
							</button>
						</div>
					</section>
				</Fragment>
			);
		})} />
	);
}
