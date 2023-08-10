import React, { useState } from "react";
import { Stocks } from "./components";
import { StockContext } from "./context";
import "./App.css";

const App: React.FC = () => {
  const [selectedStocks, setSelectedStocks] = useState<Symbol[]>([])

  return (
    <StockContext.Provider value={{ selectedStocks, setSelectedStocks }}>
      <Stocks />
    </StockContext.Provider >
  );
}


export default App;
