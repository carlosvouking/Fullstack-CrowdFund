const { assert } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")



// testing contract
describe("FundMe", async function() {
    let fundMe
    let deployer
    let mockV3Aggregator
    // Before each test, first deploying our FundMe contract    
    beforeEach( async () => {
        // deploying contract making use of hardhat-deploy...then our deployed contract will come with Mocks and everything else
        //...ficture() of the deployments object of hardhat help run all the deploy scripts in the entire deploy folder with as many tags as we want.
        /*const accounts = await ethers.getSigners() // Another to get different accounts from hardhat.config...getSigners() returns the PRIVATE_KEY / account in the network accounts section in config
          const accountZero = accounts[0]*/
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])    // at this point our contract is deployed (by running '00-deploy-mocks' and '01-deploy-fund-me')
        // let save our most recent deployed contract using 'getContract' in the fundMe variable
        fundMe = await ethers.getContract("FundMe", deployer)    // deployed contract to interact with...and we call a function inside FundMe , it will be automatically form that deployer
        mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
    })
    
    // testing constructor...goal:: assiging the priceFeed address corectly to the mockV3Aggregator
    describe("constructor", async () => {
        it("makes sure priceFeed is set correctly", async () => {
              const fundMe_priceFeed = await fundMe.priceFeed()
              const MockV3Aggregator_priceFeed = mockV3Aggregator.address
              assert.equal(fundMe_priceFeed, MockV3Aggregator_priceFeed)
        })
    })


    // testing FundMe() function...goal:: 
    describe("fundme", async () => {
        it("Should sent enough ETH otherwise fails", async () => {
            const fundMe_priceFeed = await fundMe.fund()
           
        })
    })



    // testing withdraw()...goal:: 
    describe("withdraw", async () => {
        it()
    })
})

