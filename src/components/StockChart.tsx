import React, { memo, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  CircularProgress,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import {
  lineChartConfiguration,
  candlestickChartOptions,
  priceDefination,
  initialCandleResponse,
  defaultValueForPriceType,
} from "../constant";
import {
  convertStockToChart,
  fetchHistoricalData,
  RequestStockPrices,
  convertToSinglePriceChart,
  StockPrices,
} from "../utils";
import { TogglePrice } from "./InputComponents";

const StockChart: React.FC<{
  filter: RequestStockPrices;
  isSubmitClicked: boolean;
  handleResetChart: (isSubmitClicked: boolean) => void;
}> = ({ filter, isSubmitClicked, handleResetChart }) => {
  const [options, setOption] = useState<{
    series: any[];
    option: any;
  }>({
    series: [],
    option: candlestickChartOptions,
  });
  const [stockPriceDefination, setStockPriceDefination] = useState<string>(
    defaultValueForPriceType
  );
  const [stockChartValues, setStockChartValues] = useState<StockPrices[]>(
    initialCandleResponse
  );

  const [loader, setLoader] = useState(false);

  const chartType =
    stockPriceDefination === defaultValueForPriceType ? "candlestick" : "area";

  const handleChangePriceType = (e: any) => {
    setStockPriceDefination(e);
    try{
      setLoader(true);
      const formatedResponse = stockChartValues.map((d: any, index: number) => {
        const name =
          filter &&
          filter.list &&
          filter.list[index] &&
          filter.list[index].displaySymbol
            ? filter.list[index].displaySymbol
            : null;
        return {
          name: name,
          data:
            e === defaultValueForPriceType
              ? d && d["s"] === "ok"
                ? convertStockToChart(d)
                : []
              : d && d["s"] === "ok"
              ? convertToSinglePriceChart(d[e], d["t"])
              : [],
        };
      });
  
      setOption({
        ...options,
        option:
          e === defaultValueForPriceType
            ? {
                ...options.option,
                ...candlestickChartOptions,
              }
            : {
                ...options.option,
                ...lineChartConfiguration,
              },
        series: formatedResponse,
      });
      setLoader(false);

    }catch(e){
      setLoader(false);
    }
  };

  useEffect(() => {
    const startDate = new Date(filter.from);
    const endDate = new Date(filter.to);

    if (
      endDate >= startDate &&
      !isNaN(startDate.getTime()) &&
      !isNaN(startDate.getTime()) &&
      filter &&
      filter.list &&
      filter.list.length > 0
    ) {
      checkLatestStockPrice(filter);
    } else {
      setOption({
        ...options,
        series: [],
      });
    }
  }, [filter]);

  {
    /*Request Stock Price */
  }
  const checkLatestStockPrice = async (req: RequestStockPrices) => {
    try {
      setLoader(true);
      const result = await fetchHistoricalData(
        req.resolution,
        req.from,
        req.to,
        req.list
      );
      setStockChartValues(result);
      // format data as per chart
      const format = result.map((stockChartValues: any, index: number) => {
        const name =
          filter &&
          filter.list &&
          filter.list[index] &&
          filter.list[index].displaySymbol;

        return {
          name,
          data:
            stockChartValues && stockChartValues["s"] === "ok"
              ? convertStockToChart(stockChartValues)
              : [],
        };
      });

      setOption({
        ...options,
        series: format,
      });
      setLoader(false);

      // handleResetChart(false);
    } catch (error) {
      setLoader(false);
      setOption({
        ...options,
        series: [],
      });
      handleResetChart(false);
    }
  };

  {
    /* No data bloack for chart */
  }

  return (
    <div className="chart-container">
      {loader ? (
        <CircularProgress />
      ) : options && options.series && options.series.length === 0 ? (
        <div className="no-chart-container">Chart data not available!</div>
      ) : (
        <React.Fragment>
          <TogglePrice handlePrice={handleChangePriceType} />

          <ReactApexChart
            className="stock-chart"
            options={options.option}
            series={options.series}
            type={
              stockPriceDefination === defaultValueForPriceType
                ? "candlestick"
                : "area"
            }
            height={320}
            width={"100%"}
            key={
              stockPriceDefination === defaultValueForPriceType
                ? "candlestick1"
                : "area1"
            }
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default memo(StockChart);
