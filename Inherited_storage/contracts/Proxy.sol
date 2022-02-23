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
         //   switch result case 0 {revert(0, 0)} default {return (0, returndatasize())}
            switch result case 0 {revert(0, returndatasize())} default {return (0, returndatasize())}

        }
/*
        (bool success, bytes memory returnedData) = impl.delegatecall(msg.data);
        if (success) {
            return returnedData;
        } else {
            if (returnedData.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly

                assembly {
                    let returndata_size := mload(returnedData)
                    revert(add(32, returnedData), returndata_size)
                }
            } else {
                revert("revert");
            }
        }
    */
    }
}
