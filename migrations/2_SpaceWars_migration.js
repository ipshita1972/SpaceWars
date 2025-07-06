const SpaceWars = artifacts.require("SpaceWars");

module.exports = function (deployer) {
    deployer.deploy(SpaceWars);
};