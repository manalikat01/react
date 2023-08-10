import React, { useState } from "react";
import { LandingPage } from "./components";
import { StockContext } from "./context";
import { StockSymbol } from "./utils";
import "./App.css";

const App: React.FC = () => {
  const [selectedStocks, setSelectedStocks] = useState<StockSymbol[]>([]);

  return (
    <StockContext.Provider value={{ selectedStocks, setSelectedStocks }}>
      <LandingPage />
    </StockContext.Provider>
  );
};

export default App;
