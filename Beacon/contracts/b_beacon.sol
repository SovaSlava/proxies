//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;


import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

contract MyBeacon is UpgradeableBeacon {
    constructor(address implementation) UpgradeableBeacon(implementation) {}
}