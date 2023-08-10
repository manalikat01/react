import {  StockPrices } from "../types";

// Converts  Date to  Unix Time  for stocks price
export const convertDateToUnixTimestamp = (date: Date) => {
  return Math.floor(date.getTime() / 1000);
};

// Converts Unix Time to Date  for chart view
export const convertUnixTimestampTodate = (date: number) => {
  return new Date(date * 1000);
};

// Returns data for selected stocks
export const convertStockToChart = (data: StockPrices) => {
  return data ? data.c.map((item: any, index: number) => {
    return {
      x: convertUnixTimestampTodate(data.t[index]),
      y: [
        item,
        data.o[index],
        data.l[index],
        data.h[index]
      ]
    };
  }) : [];
};

// Returns data for selected price type like open price, low price
export const convertToSinglePriceChart = (price: number[], time: number[]) => {
  return price ? price.map((item: any, index: number) => {
    return [
      new Date(time[index] * 1000).getTime(),
      item
    ]

  }) : [];
};

// Returns the date one year back fron today
export const subtractYears = () => new Date(new Date().setFullYear(new Date().getFullYear() - 1))
