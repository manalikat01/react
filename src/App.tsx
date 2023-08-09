import React, { useState } from "react";
import { StockContainer } from "./components";
import { StockContext } from "./context";
import "./App.css";

const App: React.FC = () => {
  const [stockList, setStockList] = useState<Symbol[]>([])

  return (
    <StockContext.Provider value={{ stockList, setStockList }}>
      <StockContainer />
    </StockContext.Provider >
  );
}


export default App;
