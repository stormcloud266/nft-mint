import { Accounts } from "../types";
import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import roboPunksNFT from "../RoboPunksNFT.json";

const roboPunksNFTAddress = "0xFc6853a331603a8093F7869c5F2539FAbB05bc03";

export const MainMint = ({ accounts, setAccounts }: Accounts) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = accounts[0];

  const handleMint = async () => {
    if (window.ethereum) {
      // allows ethers to connect to the blockchain
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // anytime you want to make an actual transaction, you need a signer
      const signer = provider.getSigner();

      // to be able to use the contract's function
      const contract = new ethers.Contract(
        roboPunksNFTAddress,
        roboPunksNFT.abi,
        signer
      );

      try {
        // solidity requires BigNumber
        // pass value to functions that require it
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
        });
        console.log("response: ", response);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <div className="text-center mt-12">
      {isConnected ? (
        <div>
          <div className="flex items-center gap-4 justify-center">
            <button
              className="text-2xl bg-white/10 text-purple-300 rounded-md h-8 w-8 flex items-center justify-center"
              onClick={handleDecrement}
            >
              &#8211;
            </button>
            <p className="font-bold text-lg">{mintAmount}</p>
            <button
              className="text-2xl bg-white/10 text-purple-300 rounded-md h-8 w-8 flex items-center justify-center"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
          <button
            className="text-gray-700 font-bold bg-purple-300 rounded-md py-1 px-4 mt-8"
            onClick={handleMint}
          >
            {mintAmount > 1 ? "Mint NFTs" : "Mint NFT"}
          </button>
        </div>
      ) : (
        <h2 className="text-xl">Connect wallet to mint your NFT</h2>
      )}
    </div>
  );
};
