const fs = require('fs');

const metaRaw = fs.readFileSync('../psiforms-contract/build/contracts/PsiForms.json');
const meta = JSON.parse(metaRaw);

const baseDir = './src/assets/abi/';

fs.writeFileSync(baseDir + 'psiforms-abi.json', JSON.stringify(meta['abi']));

const networkIds = Object.keys(meta.networks);
for (let networkId of networkIds) {
	const address = meta.networks[networkId].address;

	fs.writeFileSync(baseDir + `__psiforms-_network-${networkId}.json`, JSON.stringify({ address }));
}
