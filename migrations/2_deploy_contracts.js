let CharitableCauseFactory = artifacts.require("CharitableCauseFactory");

module.exports = function (deployer) {
  deployer.deploy(CharitableCauseFactory);
};
