// helper file to help define which Network to use in function of the chainId of the blockchain we are on....

const networkConfig = {
    // Testnets which do have chainId...Easy!?
    4: {
        name: "rinkeby",
        ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e"
    },
    56: {
        name: "bnb",
        ethUsdPriceFeed: "0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e"
    },
    137: {
        name: "polygon",
        ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945"
    },
    69: {
        name: "optimism kovan",
        ethUsdPriceFeed: "0x7f8847242a530E809E17bF2DA5D2f9d2c4A43261"
    },
    421611: {
        name: "arbitrum rinkeby",
        ethUsdPriceFeed: "0x5f0423B1a6935dc5596e7A24d98532b67A0AeFd8"
    } ,    
    43113: {
        name: "avalanche fuji testnet",
        ethUsdPriceFeed: "0x86d67c3D38D2bCeE722E601025C25a575021c6EA"
    },
    1666700003: {
        name: "harmony testnet shard 3",
        ethUsdPriceFeed: "0x4f11696cE92D78165E1F8A9a4192444087a45b64"
    },    

}


// local network (default Hardhat or Localhost) which do not have PriceFeed address ?? ....On doit créer un 'contrat mock'
const developmentChains = ["hardhat", "localhost"]
const DECIMALS = 8
const INITIAL_ANSWER = 200000000000  // what is the priceFeed starting at ?


module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER
}