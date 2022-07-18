// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract Impl1  is Initializable, OwnableUpgradeable, UUPSUpgradeable {

    string public name;

    /**
      *  @custom:oz-upgrades-unsafe-allow constructor
     */
    constructor() {
        _disableInitializers();
    }

    function initialize(string memory _name) external initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        name = _name;
   }

    function v() external pure returns(uint) {
        return 1;
   }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

}