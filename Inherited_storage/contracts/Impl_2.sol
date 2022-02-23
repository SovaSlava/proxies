//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Storage.sol";

contract StorageContract2 is StorageContract {
    string public name;
}

contract Impl2 is StorageContract2 {

    function setNumber(uint _newNumber) external {
        number = _newNumber;
    }

    function setName(string memory _newName) external {
        name = _newName;
    }
}