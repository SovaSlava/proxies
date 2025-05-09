//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;
import "./IStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract Implementation_2 is Ownable{

    IStorage public myStorage;
    constructor(address storageContract) Ownable(msg.sender) {
        myStorage = IStorage(storageContract);
    }

    function setNextImplementationAddress(address newAddress) external onlyOwner {
        myStorage.setAddressValue("allowedCaller", newAddress);
    }

    function getAliceAge() external view returns(uint) {
        return myStorage.UIntStorage("AliceAge");
    }

     function setAliceAge(uint newAge) external onlyOwner {
        myStorage.setUIntValue("AliceAge", newAge);
    }
    
    function getJohnAge() external view returns(uint) {
        return myStorage.UIntStorage("JohnAge");
    }

    function setJohnAge(uint newAge) external onlyOwner {
        myStorage.setUIntValue("JohnAge", newAge);
    }
}