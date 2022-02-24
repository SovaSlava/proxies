//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract ProxyContract {

    mapping(bytes32 => uint256) internal uIntStorage;
    mapping(bytes32 => uint256[]) internal uIntArrayStorage;
    mapping(bytes32 => string) internal stringStorage;
    mapping(bytes32 => address) internal addressStorage;
    mapping(bytes32 => bytes) internal bytesStorage;


    constructor(address impl) {
        addressStorage["owner"] = msg.sender;
        addressStorage["implementation"] = impl;
  }

    function setImplAddress(address _impl) public {
        require(msg.sender == addressStorage["owner"]);
        addressStorage["implementation"] = _impl;
    }

    fallback() external {
        address implementaton = addressStorage["implementation"];
        assembly {
            let _target := implementaton
            calldatacopy(0x0, 0x0, calldatasize())
            let result := delegatecall(gas(), _target, 0x0, calldatasize(), 0x0, 0)
            returndatacopy(0x0, 0x0, returndatasize())
            switch result case 0 {revert(0, returndatasize())} default {return (0, returndatasize())}
        }
    }
}

