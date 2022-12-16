import { useState } from "react";
import { MainMint } from "./components/MainMint";
import { Navbar } from "./components/Navbar";

import "./App.css";

function App() {
  const [accounts, setAccounts] = useState<string[]>([]);

  return (
    <div className="App">
      <Navbar accounts={accounts} setAccounts={setAccounts} />
      <MainMint accounts={accounts} setAccounts={setAccounts} />
    </div>
  );
}

export default App;
