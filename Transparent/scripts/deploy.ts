import { ethers, upgrades } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Transparent_i1, Transparent_i1__factory, Transparent_i2__factory } from "../typechain-types";

async function main() {
  let ImplV1:Transparent_i1__factory;
  let ImplV2:Transparent_i2__factory;
  let proxyV1:Transparent_i1;
  let owner:SignerWithAddress;


    [owner] = await ethers.getSigners();
    ImplV1 = await ethers.getContractFactory("Transparent_i1");
    ImplV2 = await ethers.getContractFactory("Transparent_i2");
    proxyV1 = await upgrades.deployProxy(ImplV1, ["john"], {kind:"transparent"}) as Transparent_i1;
    console.log("Proxy deployed to:", proxyV1.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
