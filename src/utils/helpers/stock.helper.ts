import { Stock } from "../types";

/* Convert Date to UnixTimestamp*/
export const convertDateToUnixTimestamp = (date: Date) => {
  return Math.floor(date.getTime() / 1000);
};

/* Convert API response to chart data*/
export const convertStockToChart = (data: Stock) => {
  return data ? data.c.map((item: any, index: number) => {
    return {
      x: new Date(data.t[index]),
      y: [
        item,
        data.o[index],
        data.l[index],
        data.h[index]
      ]
    };
  }) : [];
};

export const subtractYears= () => new Date(new Date().setFullYear(new Date().getFullYear() - 1))
