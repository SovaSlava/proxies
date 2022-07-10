//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


contract Transparent_i1  is Initializable {

    string public name;
    function initialize(string memory _name) external initializer {
       name = _name;
   }

    function v() external pure returns(uint) {
       return 1;
   }

}