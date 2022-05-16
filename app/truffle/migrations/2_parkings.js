const Parkings = artifacts.require("Parkings");

module.exports = function (deployer) {
  deployer.deploy(Parkings);
};
