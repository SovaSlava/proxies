const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");
import {
  BeaconImpl1,
  BeaconImpl2,
  MyBeacon,
} from "../typechain";

const provider = ethers.provider;
describe("Beacon proxy", function () {

   let ImplV1:BeaconImpl1;
   let ImplV2:BeaconImpl2;
   let beacon:MyBeacon;
   let proxy1:BeaconImpl1;
   let proxy2:BeaconImpl1;
   let proxy1v2:BeaconImpl2;
   let proxy2v2:BeaconImpl2;

   before(async () => {
        ImplV1 = await ethers.getContractFactory("Beacon_impl1");
        ImplV2 = await ethers.getContractFactory("Beacon_impl2");
        beacon = await (await upgrades.deployBeacon(ImplV1)).deployed();

        proxy1 = await (await upgrades.deployBeaconProxy(beacon, ImplV1, ["dog"])).deployed();
        proxy2 = await (await upgrades.deployBeaconProxy(beacon, ImplV1, ["dog"])).deployed();

    })


  it("check v1", async function () {
    expect(await proxy1.v()).to.equal(1);
  })

  it("upgrade beacon to v2", async function () {
    await upgrades.upgradeBeacon(beacon, ImplV2);
    proxy1v2 = ImplV2.attach(proxy1.address);
    proxy2v2 = ImplV2.attach(proxy2.address);
    expect(await proxy1v2.v()).to.equal(2);
    expect(await proxy2v2.v()).to.equal(2);
    expect(await proxy2v2.name()).to.equal("dog");
  })
})



