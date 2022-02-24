//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract Implementation_2 {

    mapping(bytes32 => uint256) internal uIntStorage;
    mapping(bytes32 => uint256[]) internal uIntArrayStorage;
    mapping(bytes32 => string) internal stringStorage;
    mapping(bytes32 => address) internal addressStorage;
    mapping(bytes32 => bytes) internal bytesStorage;
  
    function getUser() external view returns(address) {
        return addressStorage["user"];
    }

    function setUser(address newUser) external {
        addressStorage["user"] = newUser;
    }

    function setName(string memory yourName) external {
        stringStorage["name"] = yourName;
    }

    function getName() external view returns(string memory) {
        return stringStorage["name"];
    }
}