import { createContext, useContext } from "react";

export type StockContent = {
    selectedStocks: Symbol[],
    setSelectedStocks: (c: Symbol[]) => void
}

export const StockContext = createContext<StockContent>({
    selectedStocks: [],
    setSelectedStocks: () => { },
})

export const useStockContext = () => useContext(StockContext);
