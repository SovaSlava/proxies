//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;


import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";

contract ProxyBeacon is BeaconProxy {
    constructor (address _beacon) BeaconProxy(_beacon, "0x0") {}
}