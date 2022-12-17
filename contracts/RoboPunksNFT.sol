// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoboPunksNFT is ERC721, Ownable {
  // storage variables cost ETH
  // minimize creating and changing storage variables as much as possible
  uint256 public mintPrice;              // how much it costs to mint
  uint256 public totalSupply;            // current NFTs that have been minted
  uint256 public maxSupply;              // max number that can be minted
  uint256 public maxPerWallet;           // max number a specific wallet can have
  bool public isPublicMintEnabled;       // determines when NFTs can be minted
  string internal baseTokenUri;          // for marketplaces to get image data
  address payable public withdrawWallet; // money withdrawn from the contract would go into this wallet
  mapping (address => uint256) public walletMints; // keeps track of mints

  constructor() payable ERC721("RoboPunks", "RP") {
    // initializing variables is slightly cheaper
    mintPrice    = .02 ether;
    totalSupply  = 0;
    maxSupply    = 1000;
    maxPerWallet = 3;
    // set withdraw wallet address
  }
 
  function setIsPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner {
    isPublicMintEnabled = _isPublicMintEnabled;
  }

  // base uri for token metadata, tokeURI() appends tokenId and .json to this uri
  function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
    baseTokenUri = _baseTokenUri;
  }

  // from ERC721 - function that OpenSea calls to get image URI
  function tokenURI(uint256 _tokenId) public view override returns (string memory) {
    require(_exists(_tokenId), "Token does not exist");
    return string(abi.encodePacked(baseTokenUri, Strings.toString(_tokenId), ".json"));
  }

  function withdraw() external onlyOwner {
    (bool success, ) = withdrawWallet.call{value: address(this).balance}("");
    require(success, "withdraw failed");
  }

  function mint(uint256 _quantity) public payable {
    require(isPublicMintEnabled, "minting not enabled");
    require(msg.value == _quantity * mintPrice, "minting not enabled");
    require(totalSupply + _quantity<= maxSupply, "sold out");
    // need to keep track of who mints
    // using balanceOf means they can mint, transfer to a new wallet, and mint again
    require(walletMints[msg.sender] + _quantity <= maxPerWallet, "exceeded wallet limit");

    for (uint256 i = 0; i < _quantity; i++) {
      uint256 newTokenId = totalSupply + 1;
      totalSupply++;
      // comes from ERC721
      _safeMint(msg.sender, newTokenId);
    }
  }

}
