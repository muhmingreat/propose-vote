import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { expect } from "chai";
  import hre from "hardhat";


describe("Message test", function () {
   async function deployMessageFixture() {
  
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await hre.ethers.getSigners();
  
      const Message = await hre.ethers.getContractFactory("Message");
      const message = await Message.deploy();
  
      return { message, owner, otherAccount };
    }
  
    describe("Deployment", function ()  {
      it("Should set the message", async function () {
        const { message, owner } = await loadFixture(deployMessageFixture);
        const msg = 'Helo Deploy'
        expect(await message.owner()).to.equal(owner);
      })
    })

    it("do the needfull" , async function () {
      const {message, otherAccount} = await loadFixture(deployMessageFixture);
      const msg = 'Hello World'
    
    await expect(message.connect(otherAccount).setMessage(msg)).to.be.revertedWith("You aren't the owner")  
    })
    
      it('"Should make tranfer', async function () {
      const {message, owner, otherAccount} = await loadFixture(deployMessageFixture)
       await message.connect(owner).transferOwnership(otherAccount)

       expect (await message.owner()).to.equal(otherAccount)
      })
  
  
});
    

