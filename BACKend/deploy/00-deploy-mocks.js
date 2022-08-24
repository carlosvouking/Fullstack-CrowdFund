/* 
This only when deploying on 'hardhat' or on 'localhost'...the goal is to deploy our OWN Mock priceFeed contract 
and use it in our normal deploy file: '01-deploy-fund-me' as our "ethUsdPriceFeedAddress"
*/

const {network} = require("hardhat")
const { getNamedAccounts, deployments } = require("hardhat")
const {developmentChains, DECIMALS, INITIAL_ANSWER} = require("../helper-hardhat-config")



module.exports = async ({ getNamedAccounts, deployments}) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (developmentChains.includes(network.name)) {
       log("")
       log("A local network was detected, deploying mocks --->>>")
       await deploy("MockV3Aggregator", {     // our new fake contract MockV3Aggregator.sol
          contract: "MockV3Aggregator",
          from: deployer,
          log: true,
          args: [DECIMALS, INITIAL_ANSWER],
       })
       log("Mocks has been deployed !")
       log("--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+")
       log("")
    }
}

// deploying scripts with a specific tag...
module.exports.tags = ["all", "mocks"]