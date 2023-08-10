import { createContext, useContext } from "react";
import { StockSymbol } from "../utils";

export type StockContent = {
    selectedStocks: StockSymbol[],
    setSelectedStocks: (c: StockSymbol[]) => void
}

export const StockContext = createContext<StockContent>({
    selectedStocks: [],
    setSelectedStocks: () => { },
})

export const useStockContext = () => useContext(StockContext);
