// type defination for Stock
export type StockSymbol = {
  currency: string,
  description: string,
  displaySymbol: string,
  figi: string,
  mic: string,
  symbol: string,
  type: string,
  isin: string | null,
  shareClassFIGI: string,
  symbol2: string
}

// type defination for Stock Prices Response 
export type StockPrices = {
  c: any[], o: any[], l: any[], h: any[], t: any[], s: string
}

// type defination for Stock Prices Request
export type RequestStockPrices =
  {
    from: Date,
    to: Date,
    list: StockSymbol[],
    resolution: number
  }