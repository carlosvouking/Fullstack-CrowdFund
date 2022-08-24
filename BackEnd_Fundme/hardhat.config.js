require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
 const PRIVATE_KEY = process.env.PRIVATE_KEY
 const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
 const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

module.exports = {
    //solidity: "0.8.8",
    solidity: {
        compilers: [{version: "0.8.8"}, {version: "0.6.6"}]
    },
    defaultNetwork: "hardhat",   // blank blockchain...is destroyed once the script ends. 
    networks: {
        rinkeby: {
            url: RINKEBY_RPC_URL || "",
            accounts: [PRIVATE_KEY],
            chainId: 4,
            blockConfirmations: 6  // wait for 6 blocks before deployment, to give etherscan the chance to index the transaction 
        }
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY
    },
    gasReporter: {
        enabled: false,   // process.env.REPORT_GAS !== undefined,
        currency: "USD",  // in order to get this currency, we need an API key from coinmarketcap.
        outputFile: "gas-report.txt",
        nocolors: true,
        coinmarketcap: COINMARKETCAP_API_KEY,  // ceci fera un appel api sur coinmerketcap à chaque fois qu'on executera un rapport de consommation de gas
        token: "MATIC" ,  // gas reporting on polygon
    },
    namedAccounts: {
        deployer: {
            default: 0, // // here this will by default take the first account as deployer
        },
        user: {
            default: 1,
        },
    }
};