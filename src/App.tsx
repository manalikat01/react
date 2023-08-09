import React, { useState } from "react";
import { FilterContainer } from "./components";
import { StockContext, StockRequestContext } from "./context";
import "./App.css";
import { Card, CardContent } from "@mui/material";
import { RequestToCandle } from "./utils";
import { initialCandleRequest } from "./constant";

const App: React.FC = () => {
  const [stockList, setStockList] = useState<Symbol[]>([])
  const [stockRequest, setStockRequest] = useState<RequestToCandle>(initialCandleRequest)

  return (
    <StockContext.Provider value={{ stockList, setStockList }}>

      <FilterContainer />

    </StockContext.Provider >
  );
}

// export const FilterContainer: React.FC = () => {
//   return (
//     <div className="filter-container">
//       <div className="search-filter">
//         <SearchFilter />
//       </div>

//       <RangeFilter />
//       <ViewStock />
//     </div>
//   )
// }


export default App;
