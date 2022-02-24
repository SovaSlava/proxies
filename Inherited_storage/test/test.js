const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Proxy - storage version", function () {
  before(async() => {
    Impl1 = await ethers.getContractFactory("Impl1");
    impl1 = await Impl1.deploy();
    ProxyContract = await ethers.getContractFactory("Proxy");
    proxy = await ProxyContract.deploy(impl1.address);
    i1 = Impl1.attach(proxy.address);

  })
  it("Initialize implementation", async function () {
    await i1.initialize(123);
    expect(await i1.number()).to.equal(123);
  });

  it("Revert, if try initialize implementation again", async function () {
   await expect(i1.initialize(456)).revertedWith("already initialized");    
  });

  it("Change implementation contract to v2", async function () {
    Impl2 = await ethers.getContractFactory("Impl2");
    impl2 = await Impl2.deploy();
    await proxy.setImplAddress(impl2.address);
    i2 = Impl2.attach(proxy.address);
  });

  it("Read number, which was set via 1st implementation", async function () {
    expect(await i2.number()).to.equal(123);
  })

  it("Set name - its new function", async function () {
    await i2.setName("John");
    expect(await i2.name()).to.equal("John");
  });
  
});
