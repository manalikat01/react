import { Stock } from "../types";

/* Convert Date to UnixTimestamp*/
export const convertDateToUnixTimestamp = (date: Date) => {
  return Math.floor(date.getTime() / 1000);
};

/* Convert API response to chart data*/
export const convertStockToChart = (data: Stock) => {
  return data ? data.c.map((item: any, index: number) => {
    return {
      x: new Date(data.t[index] * 1000),
      y: [
        item,
        data.o[index],
        data.l[index],
        data.h[index]
      ]
    };
  }) : [];
};

export const convertToSingleValueChart = (price: number[], time: number[]) => {
  return price ? price.map((item: any, index: number) => {
    return [
      new Date(time[index] * 1000).getTime(),
      item
    ]

  }) : [];
};

export const subtractYears = () => new Date(new Date().setFullYear(new Date().getFullYear() - 1))
