// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.17;

//import openzeppelin erc721 contract standard
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract nfticket is ERC721,Ownable {
    //3 different nft groups, regular, vip and backstage. set Max supply for each and price
    uint public regularPrice= 0.001 ether;
    uint public regularMax;
        uint public vipPrice = 0.01 ether;
        uint public vipMax;
            uint public backstagePrice=0.1 ether;
            uint public backstageMax;

uint public totalSupply;
    mapping (address => uint) minted;
    //enable mint should be a boolean, used only by owner
    bool public isMintEnabled;
   //CONSTRUCTOR REQUIRES THE NAME AND SYMBOL OF THE NFT
    constructor(string memory name, string memory symbol) ERC721(name,symbol) {
        regularMax=60;
        vipMax=30;
        backstageMax=10;
    }

    function toggleMint()  external onlyOwner {
        isMintEnabled = !isMintEnabled;
    }

    function mintRegular() external payable {
        //require that the mint function is enabled, that the address has not minted yet and that the current supply is less than the total
            require(isMintEnabled, "cannot mint");
            require(minted[msg.sender]<1,"Already minted");
            require(totalSupply<regularMax,"Sold out");

            require(msg.value==regularPrice,"Cant use that amount");
 
            minted[msg.sender]++;
            totalSupply++;
            uint tokenID = totalSupply;

            _safeMint(msg.sender,tokenID);



    }
}