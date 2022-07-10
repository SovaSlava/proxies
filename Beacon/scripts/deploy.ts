import { ethers, upgrades } from "hardhat";
import {
  BeaconImpl1,
  BeaconImpl2,
  BeaconImpl1__factory,
  BeaconImpl2__factory,
  MyBeacon,
} from "../typechain";

async function main() {
  let ImplV1:BeaconImpl1__factory;
  let beacon:MyBeacon;
  let proxy1:BeaconImpl1;


  ImplV1 = await ethers.getContractFactory("Beacon_impl1") as BeaconImpl1__factory;
  beacon = await (await upgrades.deployBeacon(ImplV1)).deployed() as MyBeacon;

  proxy1 = await (await upgrades.deployBeaconProxy(beacon, ImplV1, ["dog"])).deployed() as BeaconImpl1;
    console.log("Proxy deployed to:", proxy1.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
