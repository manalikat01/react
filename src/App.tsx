import React, { useState } from "react";
import { GetStocks, ViewStock, StockChart, SearchFilter, RangeFilter } from "./components";
import { StockContext } from "./context";
import "./App.css";
import { Card, CardContent } from "@mui/material";

const App: React.FC = () => {
  const [stockList, setStockList] = useState<Symbol[]>([])

  return (
    <StockContext.Provider value={{ stockList, setStockList }}>
      <div className="App">
        <div className="header">
          <InfoContainer />
          <FilterContainer />
        </div>
        <div className="main">
          <StockChart />
        </div>
      </div>
    </StockContext.Provider>
  );
}

export const InfoContainer: React.FC = () => {
  return (
    <div className="title">
      <Card>
        US Stock Exchange
        <CardContent>You can select at most 3 stock for  detail pricing</CardContent>
      </Card>
    </div>
  )
}

export const FilterContainer: React.FC = () => {
  return (
    <div className="filter-container">
      <div className="search-filter">
        <SearchFilter />
      </div>

      <RangeFilter stocks={[]} />
        <ViewStock />
      </div>
  )
}


export default App;
