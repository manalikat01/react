import { createContext, useContext } from "react";

export type StockContent = {
    stockList: Symbol[],
    setStockList: (c: Symbol[]) => void
}

export const StockContext = createContext<StockContent>({
    stockList: [],
    setStockList: () => { },
})

export const useStockContext = () => useContext(StockContext);
