import { basePath } from '../../constant';
import { convertDateToUnixTimestamp } from '../helpers';

// Request list of stocks in US Exchange
export const fetchStockDetails = async () => {
  const url = `${basePath}/stock/symbol?exchange=US&token=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url, {
    cache: "no-cache"
  });

  return await response.json();;
};

// Request stock prices in US Exchange
export const fetchHistoricalData = async (
    resolution: number,
    from: Date,
    to: Date,
    list: any[]
) => {
  const fromDate = convertDateToUnixTimestamp(new Date(from))
  const toDate = convertDateToUnixTimestamp(new Date(to));
  const requests = list.map((entry) => fetch(`${basePath}/stock/candle?symbol=${entry.symbol}&exchange=US&resolution=${resolution}&from=${fromDate}&to=${toDate}&token=${process.env.REACT_APP_API_KEY}`));
  const responses = await Promise.all(requests);
  const promises = responses.map((response) => response.json());

  return await Promise.all(promises);
};


