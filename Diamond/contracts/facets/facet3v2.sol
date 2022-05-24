// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Facet3v2 {


    struct FacetData {
        string name;
        uint age;
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

    // new functions
    function setAge(uint _age) external {
    FacetData storage facetDataStruct = facetData();
    facetDataStruct.age = _age;
    }

    function getAge() external view returns (uint) {
        return facetData().age;
    }
}