//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


contract Transparent_i2 is Initializable {

    string public name;

    function v() external pure returns(uint) {
       return 2;
   }

    function newFunction() external pure returns(bool) {
        return true;
    }
}