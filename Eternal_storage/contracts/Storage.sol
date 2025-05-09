//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

contract StorageContract {

    modifier onlyAllowedCaller() {
        require(msg.sender == AddressStorage["allowedCaller"], "Not allowed");
        _;
    }

    constructor(address allowedCaller) {
        AddressStorage["allowedCaller"] = allowedCaller;
    }

    mapping(bytes32 => uint) public UIntStorage;
    mapping(bytes32 => bool) public BooleanStorage;
    mapping(bytes32 => address) public AddressStorage;
 
    function setUIntValue(bytes32 record, uint value) external onlyAllowedCaller
    {
        UIntStorage[record] = value;
    }
 
    function setBooleanValue(bytes32 record, bool value) external onlyAllowedCaller
    {
        BooleanStorage[record] = value;
    }


    function setAddressValue(bytes32 record, address value) external onlyAllowedCaller
    {
        AddressStorage[record] = value;
    }

}