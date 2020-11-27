var Drone = artifacts.require("./Drone.sol");

module.exports = function(deployer) {
  deployer.deploy(Drone);
};