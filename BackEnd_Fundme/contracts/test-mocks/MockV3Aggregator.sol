/* nous allons définir notre propre Imitation (FAKE priceFeed contract) Aggregator pricefeed ici pour faire des test en local */

// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/tests/MockV3Aggregator.sol";

// Note --> Once this Mock contract is compile we can use it as priceFeed to deploy a fake priceFeed to a local blockchain...basically on developmentChains = ["localhost", "hardhat"]
