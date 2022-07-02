const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");


const provider = ethers.provider;
describe("Beacon proxy", function () {

   let ImplV1;
   let ImplV2;
   let beacon;
   let proxy1;
   let proxy2;
   before(async () => {
        ImplV1 = await ethers.getContractFactory("Beacon_impl1");
        ImplV2 = await ethers.getContractFactory("Beacon_impl2");
        beacon = await upgrades.deployBeacon(ImplV1);

        await beacon.deployed();

        proxy1 = await upgrades.deployBeaconProxy(beacon, ImplV1, ["dog"]);
        proxy2 = await upgrades.deployBeaconProxy(beacon, ImplV1, ["dog"]);
  
        await proxy1.deployed();
        await proxy2.deployed();
       

    })


  it("check v1", async function () {
    expect(await proxy1.v()).to.equal(1);
  })

  it("upgrade beacon to v2", async function () {
    await upgrades.upgradeBeacon(beacon, ImplV2);
    proxy1 = ImplV2.attach(proxy1.address);
    proxy2 = ImplV2.attach(proxy2.address);
    expect(await proxy1.v()).to.equal(2);
    expect(await proxy2.v()).to.equal(2);
    expect(await proxy2.name()).to.equal("dog");
  })
})



