// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Facet3 {


    struct FacetData {
        string name;
    }

  function facetData()
    internal
    pure
    returns(FacetData storage facetDataStruct) {
    bytes32 storagePosition = keccak256("diamond.storage.Facet3");
    assembly {facetDataStruct.slot := storagePosition}
  }

  function setName(string memory _name) external {
    FacetData storage facetDataStruct = facetData();
    facetDataStruct.name = _name;
  }

  function getName() external view returns (string memory) {
    return facetData().name;
  }
}