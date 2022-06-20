import { expect } from "chai";
import { ethers } from "hardhat";
import { Note__factory, 
         NoteFactory__factory,
         Note,
         NoteFactory } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";


describe("Note factory", function () {

    let factoryOwner: SignerWithAddress;
    let user1: SignerWithAddress;
    let user2: SignerWithAddress;
    let note: Note;
    let noteFactory: NoteFactory;
    let user1Note:Note;
    let user2Note:Note;
    before(async () => {
        [factoryOwner, user1, user2] = await ethers.getSigners();
        note =  await new Note__factory(factoryOwner).deploy();
        noteFactory = await new NoteFactory__factory(factoryOwner).deploy(note.address);

        // user1 deploy proxy
        await noteFactory.connect(user1).createNoteContracts();
        let user1NoteAddress:string  = await noteFactory.notes(user1.address);
        user1Note = note.attach(user1NoteAddress);
        expect(await user1Note.owner()).to.equal(user1.address);
        // user2 deploy proxy
        await noteFactory.connect(user2).createNoteContracts();
        let user2NoteAddress:string  = await noteFactory.notes(user2.address);
        user2Note = note.attach(user2NoteAddress);
        expect(await user2Note.owner()).to.equal(user2.address);
    })

    it("user1 write note and read it", async function () {
        await user1Note.connect(user1).writeNote("I like dogs");
        expect(await user1Note.note()).to.equal("I like dogs");
    })

    it("user2 write note and read it", async function () {
        await user2Note.connect(user2).writeNote("I like cats");
        expect(await user2Note.note()).to.equal("I like cats");
    })
})