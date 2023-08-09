import dayjs from "dayjs";
import { createContext, useContext } from "react";
import { RequestToCandle, subtractYears } from "../utils";
import { initialCandleRequest } from "../constant";

export type StockContent = {
    stockList: Symbol[],
    setStockList: (c: Symbol[]) => void
}

export const StockContext = createContext<StockContent>({
    stockList: [],
    setStockList: () => { },
})

export const useStockContext = () => useContext(StockContext);


export type StockRequest = {
    stockRequest: RequestToCandle,
    setStockRequest: (c: RequestToCandle) => void
}

export const StockRequestContext = createContext<StockRequest>({
    stockRequest: initialCandleRequest,
    setStockRequest: () => { },
})

export const useStockRequestContext = () => useContext(StockRequestContext);
