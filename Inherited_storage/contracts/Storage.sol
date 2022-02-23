//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract StorageContract {
    address public impl;
    address public proxyAdmin;
    uint public number;
    bool initialized;
}