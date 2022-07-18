import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import '@primitivefi/hardhat-dodoc';
import '@openzeppelin/hardhat-upgrades';
dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bscTestnet: {
      url: process.env.BSCTESTNET_URL || "",
      accounts:
        process.env.BSCTESTNET_PRIVATE_KEY !== undefined ? [process.env.BSCTESTNET_PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: (process.env.REPORT_GAS=='true') ? true : false,
    currency: "USD",
    excludeContracts: ['MockERC1155', 'MockERC20', 'MockERC721', 'ERC1155', 'ERC721', 'ERC20'],
    token: "BNB",
    gasPriceApi: "https://api.bscscan.com/api?module=proxy&action=eth_gasPrice",
    coinmarketcap: process.env.COINMARKETCAPAPI
  },
  etherscan: {
    apiKey: {
      bscTestnet: process.env.BSCSCAN_API_KEY || ""
    }
  },
};

export default config;
