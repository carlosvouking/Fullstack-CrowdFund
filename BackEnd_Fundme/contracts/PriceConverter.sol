// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// Why is this a library and not abstract?
// Why not an interface?
library PriceConverter {
    // price Of ETH In terms of USD......answer is in USD.....// ie : to buy 1eth , must spend 'answer' USD
    // Donc 'answer' c'est le nombre de $USD qu'il faut pour achetehr 1eth.
    //....We could make this public, but then we'd have to deploy it
    function getPrice(AggregatorV3Interface priceFeed)
        internal
        view
        returns (uint256)
    {
        // // Rinkeby ETH / USD Address
        // // https://docs.chain.link/docs/ethereum-addresses/
        // AggregatorV3Interface priceFeed = AggregatorV3Interface(
        //     0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
        // );
        (, int256 answer, , , ) = priceFeed.latestRoundData(); //answer= priceOfETHIntermsofUSD
        // ETH/USD rate in 18 digit
        return uint256(answer * 10000000000);
    }

    // function getPriceEuroToUsd(AggregatorV3Interface priceFeedEuroToUsd)
    //     internal
    //     view
    //     returns (uint256)
    // {
    //     // // il nous faut l'adresse Rinkeby de l'équivalence EUR / USD
    //     // // https://docs.chain.link/docs/ethereum-addresses/
    //     // //https://rinkeby.etherscan.io/address/0x78F9e60608bF48a1155b4B2A5e31F32318a1d85F
    //     // AggregatorV3Interface priceFeedEuroToUsd = AggregatorV3Interface(
    //     //     0x78F9e60608bF48a1155b4B2A5e31F32318a1d85F
    //     // );
    //     (, int256 answer, , , ) = priceFeedEuroToUsd.latestRoundData();
    //     return uint256(answer);
    // }

    // 1000000000
    // Pass some ETH Amount and at the other side how much that Eth amount is worth in terms of USD
    function getConversionRate(
        uint256 ethAmount,
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        uint256 ethPrice = getPrice(priceFeed); //ethprice (en $USD )::  le nombre de $USD qu il faut pour acheter 1 eth.
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1000000000000000000; //ethAmountInUsd (en Eth)::  le nombre de $USD qu'il faut donc pour le nombre de ETH apportés pour participer (msg.value)
        // the actual ETH/USD conversion rate, after adjusting the extra 0s.
        return ethAmountInUsd; //$USD
    }

    // function getConversionRateInEuro(
    //     uint256 ethAmountEuro,
    //     AggregatorV3Interface priceFeedEuroToUsd
    // ) internal view returns (uint256) {
    //     uint256 ethPriceInEuro = getPriceEuroToUsd(priceFeedEuroToUsd);
    //     uint256 ethAmountInEuro = (ethPriceInEuro * ethAmountEuro) /
    //         1000000000000000000;
    //     // ci dessous la conversion actuelle entre ETH/EUR après ajustement des zéros
    //     return ethAmountInEuro;
    // }
}
