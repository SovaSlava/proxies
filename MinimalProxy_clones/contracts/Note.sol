//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
contract Note is Ownable, Initializable{

    string public note;
    uint public deployDate;
    function writeNote(string memory newNote) external onlyOwner {
        note = newNote;
    }

    function initialize(uint _deployDate, address newOwner) external initializer {
        _transferOwnership(newOwner);
        deployDate = _deployDate;
    }

}