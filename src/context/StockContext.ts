import { createContext, useContext } from "react";

export type StockContent = {
    stockList: any[]
    setStockList: (c: any[]) => void
}

export const StockContext = createContext<StockContent>({
    stockList: [],
    setStockList: () => { },
})

export const useStockContext = () => useContext(StockContext);