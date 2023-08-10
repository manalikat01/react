import React, { useState } from "react";
import { Stocks } from "./components";
import { StockContext } from "./context";
import "./App.css";

const App: React.FC = () => {
  const [stockList, setStockList] = useState<Symbol[]>([])

  return (
    <StockContext.Provider value={{ stockList, setStockList }}>
      <Stocks />
    </StockContext.Provider >
  );
}


export default App;
