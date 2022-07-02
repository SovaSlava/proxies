//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


contract Beacon_impl2  is Initializable {

    string public name;

    function v() external pure returns(uint) {
       return 2;
    }
}