export type Symbol = {
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

export type Stock = {
  c: any[], o: any[], l: any[], h: any[], t: any[], s: string
}

export type ChartSeries = {
  name: string;
  data: {
    x: Date;
    y: any[];
  }[];
}

export type RequestToCandle =
  {
    from: Date,
    to: Date,
    list: Symbol[],
    resolution: string
  }