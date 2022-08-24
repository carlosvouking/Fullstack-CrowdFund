// SPDX-License-Identifier: MIT
//pragma statement
pragma solidity ^0.8.8;

/* =============== Imports ===============*/
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";
import "hardhat/console.sol";

// Error codes stuffs
error FundMe__NotOwner();

/*  =============== Libraries, Interfaces stuffs here ===============*/
/** @title A simple crowd funding contract
 *   @author Carlos Vouking
 *   @notice Its a basic crow funding contract which can be extended
 *   @dev This embeds the PriceFeed library from Chainlink.
 */
contract FundMe {
    //1-Type Declarations
    using PriceConverter for uint256;

    //2-State variables
    mapping(address => uint256) public s_addressToAmountFunded;
    address[] public s_funders; // funding person/addresses
    uint256 transactionCount;
    uint256 crowFundTransactionCount;

    // Could we make this constant?  /* hint: no! We should make it immutable! */
    address public immutable i_owner;
    uint256 public constant MINIMUM_USD = 50 * 10**18; // in ETH

    event Transfer(
        address from,
        address receiver,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    event crowFundTransfer(
        address from,
        address reciever,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    struct CrowFundTransfertStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] public transactions;
    CrowFundTransfertStruct[] public crowFundTransactions;

    // 'priceFeed' et 'priceFeedEuroToUsd' sont variables et modularisés en fonction du type de blockchain (serviront désormais de 'PriceConverter')
    AggregatorV3Interface public s_priceFeed;

    //3-Modifiers
    modifier onlyOwner() {
        // require(msg.sender == owner);
        if (msg.sender != i_owner) revert FundMe__NotOwner();
        _; // doing the rest of the code in the function which inherits the 'onlyOwner' modifier
    }

    //4-Constructors
    // Lors du deploiement, passer coe argument l'adresse de prix en fucntion de la blockchain sur laquelle on opère Ethereum, BNB, Polygonlgon...Mainnet, rinkeby, Kovan etc...
    constructor(address priceFeedAddress) {
        i_owner = msg.sender; // the guy who is deploying the contract
        s_priceFeed = AggregatorV3Interface(priceFeedAddress); // ETH<=>USD // instead of 'priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e)' which is only for Rinkeby;
        //priceFeedEuroToUsd = AggregatorV3Interface(priceFeedEuroToUsdAddress);  // Euro=>USD
    }

    // get the description of the contract
    // function getDescription() external view returns (string memory) {
    //     return priceFeed.description();
    // }

    /**
     * @notice Function is used to fund the contract 'FundMe'
     * @dev The library PriceFeed is implemented here.
     */
    function fund() public payable {
        //getConversionRate(msg.value, priceFeed)
        require(
            msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
            "You need to spend more ETH!"
        ); // ConversionRate ds 'PriceConverter' aura désormais 2 paramètres: 'msg.value' et 'priceFeed'
        //require(msg.value.getConversionRateInEuro(priceFeedEuroToUsd) >= MINIMUM_EUR, "Not enough Eth to proceed !");
        // require(PriceConverter.getConversionRate(msg.value) >= MINIMUM_USD, "You need to spend more ETH!");
        s_addressToAmountFunded[msg.sender] += msg.value;
        s_funders.push(msg.sender);
    }

    /* =============== 4-Recieves ===============*/
    receive() external payable {
        //fund();
    }

    /* =============== 5-Fallbacks ===============*/
    fallback() external payable {
        //fund();
    }

    // function fundEuro() public payable {
    //     require(msg.value.getConversionRateInEuro(priceFeedEuroToUsd) >= MINIMUM_EUR,  "You probably need more ETH!");
    //     addressToAmountFunded[msg.sender] = addressToAmountFunded[msg.sender] + msg.value;
    //     funders.push(msg.sender);
    // }

    function withdraw() public payable onlyOwner {
        for (
            uint256 funderIndex = 0;
            funderIndex < s_funders.length;
            funderIndex++
        ) {
            address funder = s_funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        // resetting our funders array with (0) funders inside...thus withdrawing the funds and restart funding with a completely blank array
        s_funders = new address[](0);

        /* 
        Pour retirer les fonds cotisés, il se présente 3 méthodes possibles: Par Transfert, Par Envoi, Par Call 
        remeber Transfer and Send methods are gas expensive 2300TH 
        faut pas oublier de convertir l'adresse 'msg.value' en adresse payable 'payable(msg.value)'.
        */
        // // transfer....throws an error if it fails
        // payable(msg.sender).transfer(address(this).balance);
        // // send...returns a bool if it fails
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send failed");   // help revert the transaction if it fails
        // call...can be used to call any function in ethereum without even have to have an ABI
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call failed"); // revert if the 'call' fails
    }

    function withdrawCheaper() public payable onlyOwner {
        // here we will read and write a lot less on and to the memory...saving a ton of gas
        // we will manipulate our funders directly from memeory instaed of storage and when done with readings and writings from memory, we can update the storage s_funders ONCE
        address[] memory funders = s_funders;
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex]; // memory array
            s_addressToAmountFunded[funder] = 0;
        }
        // resetting our funders array with (0) funders inside...thus withdrawing the funds and restart funding with a completely blank array
        s_funders = new address[](0);

        (bool success, ) = i_owner.call{value: address(this).balance}("");
        require(success);
    }

    function addCrowFundTransactionToBlockchain(
        address payable receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public {
        crowFundTransactionCount += 1;
        crowFundTransactions.push(
            CrowFundTransfertStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );

        emit crowFundTransfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    // peer-2-peer
    function addToBlockchain(
        address payable receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public {
        transactionCount += 1;
        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );

        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    function getAllCrowFundTransactions()
        public
        view
        returns (CrowFundTransfertStruct[] memory)
    {
        return crowFundTransactions;
    }

    function getCrowFundTransactionCount() public view returns (uint256) {
        return crowFundTransactionCount;
    }

    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
