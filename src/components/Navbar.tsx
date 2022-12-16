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
    <div>
      <button onClick={connectWallet}>click</button>
    </div>
  );
};
