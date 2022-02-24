const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Proxy - storage version", function () {
  before(async() => {
    Impl1 = await ethers.getContractFactory("Implementation_1");
    impl1 = await Impl1.deploy();
    ProxyContract = await ethers.getContractFactory("ProxyContract");
    proxy = await ProxyContract.deploy(impl1.address);
    i1 = Impl1.attach(proxy.address);
    [owner,  Alice] = await ethers.getSigners();

  })

  it("Set user via proxy in 1st implementation", async () => {
    await i1.setUser(owner.address);
    expect(await i1.getUser()).to.equal(owner.address)
  })

  it("Change implementation contract to v2", async () => {
    Impl2 = await ethers.getContractFactory("Implementation_2");
    impl2 = await Impl2.deploy();
    await proxy.setImplAddress(impl2.address);
    i2 = Impl2.attach(proxy.address);
  });

  it("Read user address, which set in 1st implementation", async () => {
    expect(await i2.getUser()).to.equal(owner.address);
  })

  it("Set name - its new function", async () => {
    await i2.setName("John");
    expect(await i2.getName()).to.equal("John");
  });
  
});
