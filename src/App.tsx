import { useState } from "react";
import { GetStocks, ViewStock, StockChart } from "./components";
import { StockContext } from "./context";
import "./App.css";

const App: React.FC = () =>{
  const [stockList, setStockList] = useState<Symbol[]>([])

  return (
    <StockContext.Provider value={{ stockList, setStockList }}>
      <div className="App">
        <GetStocks />
        <div className="main">
            <ViewStock />
            <StockChart />
        </div>
      </div>
    </StockContext.Provider>
  );
}

export default App;
