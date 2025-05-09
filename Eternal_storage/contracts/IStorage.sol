//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

interface IStorage {

    function UIntStorage(bytes32 record) external view returns (uint);
    function setUIntValue(bytes32 record, uint value) external;
    function BooleanStorage(bytes32 record) external view returns (bool);
    function setBooleanValue(bytes32 record, bool value) external;
    function AddressStorage(bytes32 record) external view returns (address);
    function setAddressValue(bytes32 record, address value) external;
    
}