const LegalEVault = artifacts.require("LegalEVault");

module.exports = function (deployer) {
  deployer.deploy(LegalEVault);
};
