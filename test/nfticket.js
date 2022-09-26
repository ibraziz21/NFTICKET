const {expect} = require("chai");
const { ethers } = require("ethers");

describe("Nfticket", function () {
    let nftdeploy;
    beforeEach(async function(){
    [owner,user] = await hre.ethers.getSigners();
    const NFTicket = await hre.ethers.getContractFactory("nfticket");
         nftdeploy = await NFTicket.deploy("Nfticket","NTK");
        await nftdeploy.deployed();
    })
    it("Should return the correct name", async function () {
       
            const nme = await nftdeploy.deployed();
        expect(await nme.name()).equal("Nfticket");
    })
    it("Should return the correct symbol", async function () {
        
        const sym = await nftdeploy.deployed();
        expect(await sym.symbol()).equal("NTK");
        
        

    })
    it("should toggle the mintable if owner calls function", async function() {
        let instance  =await nftdeploy.deployed();
         await instance.toggleMint();

        expect(instance.isMintEnabled()==true);
    })
    it("Total Minted NFTs should never exceed total supply", async function() {
        let instance = await nftdeploy.deployed();
            await instance.toggleMint();
        await instance.connect(user).mintVip();

        expect(instance.totalSupply()<=instance.totalmax())
    })
})
