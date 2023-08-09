import dayjs, { Dayjs } from 'dayjs';
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
    resolution: string,
    from: Date,
    to: Date,
    list: any[]
) => {
  console.log(from, to );
  const [from1fromFormated, toFormated] = [convertDateToUnixTimestamp(from), convertDateToUnixTimestamp(to)]
  const requests = list.map((entry) => fetch(`${basePath}/stock/candle?symbol=${entry.symbol}&exchange=US&resolution=${resolution}&from=${from1fromFormated}&to=${toFormated}&token=${process.env.REACT_APP_API_KEY}`));
  const responses = await Promise.all(requests);
  console.log(responses );

  const promises = responses.map((response) => response.json());
  console.log(promises );

  return await Promise.all(promises);
};


