//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Storage.sol";

contract Impl1 is StorageContract {

    function setNumber(uint _newNumber) external {
        number = _newNumber;
    }

    function initialize(uint _newNumber) public 
    {
        require(!initialized, "already initialized");
        initialized = true;
        number = _newNumber;
    }
}