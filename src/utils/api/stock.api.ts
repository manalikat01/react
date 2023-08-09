import {basePath} from '../../constant';

// Request list of stocks in US Exchange
export const fetchStockDetails = async () => {
  const url = `${basePath}/stock/symbol?exchange=US&token=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url,{
    cache: "no-cache"
  });

  return await response.json();;
};

// Request stock prices in US Exchange
export const fetchHistoricalData = async (
  resolution: string,
  from: number = 0,
  to: number,
  list: any[]
) => {  
  const requests = list.map((entry) => fetch(`${basePath}/stock/candle?symbol=${entry.symbol}&exchange=US&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.REACT_APP_API_KEY}`));
  const responses = await Promise.all(requests);
  const promises = responses.map((response) => response.json());

  return await Promise.all(promises);
};


