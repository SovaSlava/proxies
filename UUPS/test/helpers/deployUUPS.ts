import { ethers, upgrades } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
    Impl1__factory,
    Impl1
} from "../../typechain-types";
export async function deployUUPS():Promise<[SignerWithAddress, Impl1]> {
    const [owner]:SignerWithAddress[] = await ethers.getSigners();
    const impl1Factory = new Impl1__factory(owner) ;

    let proxy = (await upgrades.deployProxy(impl1Factory,["John"],{
          initializer: "initialize",
          kind: "uups"}
    )) as Impl1;
    return [owner, proxy];
}

