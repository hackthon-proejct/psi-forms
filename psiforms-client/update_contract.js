const fs = require('fs');

const metaRaw = fs.readFileSync('../forms-contract/build/contracts/Forms.json');
const meta = JSON.parse(metaRaw);

const baseDir = './src/assets/abi/';

fs.writeFileSync(baseDir + 'forms-abi.json', JSON.stringify(meta['abi']));

const networkIds = Object.keys(meta.networks);
for (let networkId of networkIds) {
	const address = meta.networks[networkId].address;

	fs.writeFileSync(baseDir + `forms-network-${networkId}.json`, JSON.stringify({ address }));
}
