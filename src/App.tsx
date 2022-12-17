import { useState } from "react";
import { MainMint } from "./components/MainMint";
import { Navbar } from "./components/Navbar";

function App() {
  const [accounts, setAccounts] = useState<string[]>([]);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Navbar accounts={accounts} setAccounts={setAccounts} />
      <MainMint accounts={accounts} setAccounts={setAccounts} />
    </div>
  );
}

export default App;
