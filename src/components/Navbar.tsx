import { Accounts } from "../utils/types";

export const Navbar = ({ accounts, setAccounts }: Accounts) => {
  const isConnected = Boolean(accounts[0]);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccounts(accounts);
    }
  };

  return (
    <nav className="flex justify-between items-center py-2">
      <h1 className="text-2xl text-white font-bold uppercase">
        Minty<span className="font-light text-purple-300">Fresh</span>
      </h1>
      {isConnected ? (
        <p className="text-purple-300">connected</p>
      ) : (
        <button
          className="bg-white/10 text-purple-300 rounded-md py-1 px-4"
          onClick={connectWallet}
        >
          click
        </button>
      )}
    </nav>
  );
};
