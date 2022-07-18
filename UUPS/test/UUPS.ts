import { expect } from "chai";
import { upgrades, ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { deployUUPS } from "./helpers/deployUUPS";
import { Impl1, Impl2, Impl2__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
describe("UUPS Proxy", async() => {

    let proxyContract:Impl1;
    let owner: SignerWithAddress;
    let proxyContractV2:Impl2;
    before(async() => {
        [owner, proxyContract] = await loadFixture(deployUUPS);
    })

    it("correct initialize", async () => {
        expect(await proxyContract.name()).to.equal("John");
        expect(await proxyContract.owner()).to.equal(owner.address);
    })

    it("correct version", async () => {
        expect(await proxyContract.v()).to.equal(1)
    })

    it("upgrade to v2", async () => {
        let impl2 = await new Impl2__factory(owner).deploy();
        await proxyContract.upgradeTo(impl2.address)
        proxyContractV2 = new Impl2__factory(owner).attach(proxyContract.address)
    })

    it("check v2 implementation", async () => {
        expect(await proxyContractV2.v()).to.equal(2)
        expect(await proxyContractV2.name()).to.equal("John");
    })
})