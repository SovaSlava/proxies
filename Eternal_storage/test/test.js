const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Test", function () {
  let owner;
  let Alice;
  let impl1;
  let impl2;
  let storage;
  before(async() => {
    [owner, Alice] = await ethers.getSigners();
    let Impl1 = await ethers.getContractFactory("Implementation_1");
    impl1 = await Impl1.connect(owner).deploy();

    let StorageContract = await ethers.getContractFactory("StorageContract");
    storage = await StorageContract.deploy(impl1.address);
    await impl1.setStorageContract(storage.address);
    
  

  })


  it("Set and get John age", async () => {
    await impl1.setJohnAge(20);
    let JohnAge = await impl1.getJohnAge();
    expect(JohnAge).to.equal(20);
  })

  it("Non owner could not set implementation address in storage contract", async () => {
    expect(impl1.connect(Alice).setStorageContract(Alice.address)).revertedWith(`OwnableUnauthorizedAccount("${Alice.address}"`);
  });

  it("Deploy new implementation and try get John age", async () => {
    let Impl2 = await ethers.getContractFactory("Implementation_2");
    let impl2 = await Impl2.connect(owner).deploy(storage.address);
    let JohnAge = await impl2.getJohnAge();
    expect(JohnAge).to.equal(20);
  })

  
});
