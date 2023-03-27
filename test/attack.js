const{ expect } = require("chai");
const { ethers } = require("hardhat");

describe("tx.origin", function(){
    it("Attack.sol will be able to change the owner of the good contract", async function(){
 
        const[_,addr1] = await ethers.getSigners();
        //Deploy the good contract.
        const goodFactory = await ethers.getContractFactory("Good");
        const goodContract = await goodFactory.connect(addr1).deploy();
        await goodContract.deployed();
        console.log("Good contract's address",goodContract.address);

        //Deploy the Attack contract.
        const Attack = await ethers.getContractFactory("Attack");
        const attackContract = await Attack.deploy(goodContract.address);
        await attackContract.deployed();
        console.log("Attack contract", attackContract.address);
        let tx = await attackContract.connect(addr1).attack();
        await tx.wait();

        //Let's check if the current owener of Good.sol is actually Attack.sol
        expect(await goodContract.owner()).to.equal(attackContract.address);
    });
});
