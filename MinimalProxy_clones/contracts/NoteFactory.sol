//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

import "./Note.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract NoteFactory {
    using Clones for address;

    address public noteAddress;
    mapping(address => address) public notes;

    event NewNoteDeploy(address);

    constructor(address note) {
        noteAddress = note;
    }

    function createNoteContracts() external {
        address newNote = noteAddress.clone();
        emit NewNoteDeploy(newNote);
        Note NewNoteContract = Note(newNote);
        NewNoteContract.initialize(block.timestamp, msg.sender);
        notes[msg.sender] = newNote;
    }

    
}