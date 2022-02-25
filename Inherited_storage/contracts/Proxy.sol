//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Storage.sol";

contract Proxy is StorageContract {
    
    constructor(address _impl) {
        proxyAdmin = msg.sender;
        impl = _impl;
    }

    function setImplAddress(address _impl) public {
        require(msg.sender == proxyAdmin);
        impl = _impl;
    }

    fallback() external {
        assembly {
            let _target := sload(0)
            calldatacopy(0x0, 0x0, calldatasize())
            let result := delegatecall(gas(), _target, 0x0, calldatasize(), 0x0, 0)
            returndatacopy(0x0, 0x0, returndatasize())
            switch result case 0 {revert(0, returndatasize())} default {return (0, returndatasize())}

        }
    }
}
