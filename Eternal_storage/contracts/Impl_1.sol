//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "./IStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract Implementation_1 is Ownable(msg.sender) {

    IStorage public myStorage;
    function setStorageContract(address storageContract) external onlyOwner {
        myStorage = IStorage(storageContract);
    }

    function setNextImplementationAddress(address newAddress) external onlyOwner {
        myStorage.setAddressValue("allowedCaller", newAddress);
    }

    function getJohnAge() external view returns(uint) {
        return myStorage.UIntStorage("JohnAge");
    }

    function setJohnAge(uint newAge) external onlyOwner {
        myStorage.setUIntValue("JohnAge", newAge);
    }
}