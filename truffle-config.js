const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();
const mnemonic = process.env.MNEMONIC;
const infuraAPIKey = process.env.INFURA_API_KEY;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: "./frontend/ethereum/contracts",
  networks: {
    develop: {
      port: 8545,
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/${infuraAPIKey}`
        );
      },
      network_id: 4,
    },
  },
};
