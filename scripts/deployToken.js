 const { Contract } = require("ethers");
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
    [owner,user1,user2] =  await hre.ethers.getSigners();

    const instance = await hre.ethers.getContractFactory("nfticket");
    const start = await instance.deploy("Nftoken","NTK");
    await start.deployed();
    console.log("Successfully deployed, Contract Address: "+ start.address);

   await start.toggleMint();
    const mintable = await start.isMintEnabled();
    console.log("the contract is mintable? "+ mintable);


        const buyRegular ={value: hre.ethers.utils.parseEther("0.001")};
        await start.connect(user1).mintRegular(buyRegular);
        const total = await start.totalSupply();
        console.log("Nft Minted, total minted: "+total );




}





 main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });