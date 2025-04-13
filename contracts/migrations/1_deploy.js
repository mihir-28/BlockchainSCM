const SupplyChainAgreement = artifacts.require("SupplyChainAgreement");
const ProductTracking = artifacts.require("ProductTracking");
const AccessControl = artifacts.require("AccessControl");

module.exports = function(deployer) {
  deployer.deploy(SupplyChainAgreement);
  deployer.deploy(ProductTracking);
  deployer.deploy(AccessControl);
};