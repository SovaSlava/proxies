// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
contract Impl2  is Initializable, UUPSUpgradeable, OwnableUpgradeable {

    string public name;

    function v() external pure returns(uint) {
        return 2;
    }
    
    function setName(string memory _name) external {
        name = _name;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

}