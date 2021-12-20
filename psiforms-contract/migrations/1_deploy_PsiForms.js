const PsiForms = artifacts.require('./PsiForms.sol');

module.exports = async function(deployer, network, accounts) {

	await deployer.deploy(PsiForms);

	await PsiForms.deployed();
};
