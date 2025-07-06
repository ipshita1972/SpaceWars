const NFT_MarketPlace = artifacts.require("NFT_MarketPlace");

module.exports = function (deployer) {
    deployer.deploy(NFT_MarketPlace);
};