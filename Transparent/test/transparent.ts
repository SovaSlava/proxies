const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");
const provider = ethers.provider;
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Transparent_i1, Transparent_i1__factory, Transparent_i2, Transparent_i2__factory } from "../typechain-types";

describe("Transparent proxy", function () {

  let ImplV1:Transparent_i1__factory;
  let ImplV2:Transparent_i2__factory;
  let proxyV1:Transparent_i1;
  let proxyV2:Transparent_i2;
  let owner:SignerWithAddress;

  before(async () => {
    [owner] = await ethers.getSigners();
    ImplV1 = await ethers.getContractFactory("Transparent_i1");
    ImplV2 = await ethers.getContractFactory("Transparent_i2");
    proxyV1 = await upgrades.deployProxy(ImplV1, ["john"], {kind:"transparent"}) as Transparent_i1;
  })

  it("ProxyAdmin params", async () => {
    const adminAddress:string = await upgrades.erc1967.getAdminAddress(proxyV1.address);
    const adminContract = (await upgrades.admin.getInstance()).attach(adminAddress);
    
    expect([
            await adminContract.getProxyImplementation(proxyV1.address), 
            await adminContract.getProxyAdmin(proxyV1.address),
            await adminContract.owner(),
          ]).to.deep.eq([
            await upgrades.erc1967.getImplementationAddress(proxyV1.address),
            adminAddress, 
            owner.address
          ]);
    })

    it("Check name and version", async () => {
        expect(await proxyV1.name()).to.equal("john")
        expect(await proxyV1.v()).to.equal(1);
    })

    it("Upgrade to v2", async () => {
        proxyV2 = await upgrades.upgradeProxy(proxyV1.address, ImplV2);
    })

    it("Check name and version", async () => {
      expect(await proxyV2.name()).to.equal("john")
      expect(await proxyV2.v()).to.equal(2);
    })

})