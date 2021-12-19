import React, { useCallback } from 'react';
import { useParams } from 'react-router';

import { FormModelEditor } from '../../components/form/form-model-editor/FormModelEditor';
import { FormModel } from '../../components/form/FormModel';
import { Loader, useLoader } from '../../components/layout/Loader';
import { ConnectYourWallet } from '../../components/wallet/ConnectYourWallet';
import { ApiClient } from '../../core/ApiClient';
import { AdBoxDto } from '../../core/ApiModel';

export function EditFormRoute() {
	const { id } = useParams();
	const adBoxId = id as string;
	//const wallet = useWallet();

	//const [navigateTo, setNavigateTo] = useState<string>();
	const state = useLoader<AdBoxDto>(
		useCallback(async () => {
			return await ApiClient.getAdBox(adBoxId);;
		}, [adBoxId]));

	async function save(_: FormModel): Promise<boolean> {
		// const account = wallet.getAccount();

		return false;
	}

	//if (navigateTo) {
	//	return <Navigate to={navigateTo} />
	//}
	return (
		<Loader state={state} element={(adBox => (
			<React.Fragment>
				<ConnectYourWallet requiredNetworkId={adBox.networkId} />
				<FormModelEditor isEdit={true} data={undefined} saveHandler={save} />
			</React.Fragment>
		))} />
	);
}
