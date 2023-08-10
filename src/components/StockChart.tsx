import React, { memo, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { lineChartConfiguration, candlestickChartOptions, priceDefination, initialCandleResponse, defaultValueForPriceType } from "../constant";
import { convertStockToChart, fetchHistoricalData, RequestStockPrices, convertToSinglePriceChart, StockPrices, } from "../utils";

const StockChart: React.FC<{ filter: RequestStockPrices }> = ({
  filter
}) => {

  const [options, setOption] = useState<{
    series: any[],
    option: any
  }>({
    series: [],
    option: candlestickChartOptions
  });

  // const [lineOptions, setLineChartOption] = useState<{
  //   series: any[],
  //   option: any
  // }>({
  //   series: [],
  //   option: lineChartConfiguration
  // });


  const [stockPriceDefination, setStockPrice] = useState<string>(defaultValueForPriceType);
  const [stockChartValues, setStockChartValues] = useState<StockPrices[]>(
    initialCandleResponse
  );

  const checkLatestStockPrice = async (req: RequestStockPrices) => {
    try {
      const result = await fetchHistoricalData(
        req.resolution,
        req.from,
        req.to,
        req.list
      );
      setStockChartValues(result)

      // format data as per chart
      const format = result.map((stockChartValues: any, index: number) => {
        const name = filter && filter.list && filter.list[index] && filter.list[index].displaySymbol;

        return {
          name,
          data: stockChartValues && stockChartValues['s'] === 'ok' ? convertStockToChart(stockChartValues)
            : []
        }
      });

      setOption({
        ...options,
        series: format
      });

    } catch (error) {
      setOption({
        ...options,
        series: []
      });
    }
  };

  const handleChangePriceType = (e: any) => {
    setStockPrice(e.target.value);
    const formatedResponse = stockChartValues.map((d: any, index: number) => {
      const name = filter && filter.list && filter.list[index] && filter.list[index].displaySymbol ? filter.list[index].displaySymbol : null;
      return {
        name: name,
        data: e.target.value === defaultValueForPriceType ?
          d && d['s'] === 'ok' ? convertStockToChart(d) : []
          : d && d['s'] === 'ok' ? convertToSinglePriceChart(d[e.target.value], d['t']) : []
      }
    });

    setOption({
      ...options,
      series: formatedResponse
    });

    // if (e.target.value === defaultValueForPriceType) {
    //   setOption({
    //     ...options,
    //     series: formatedResponse
    //   });
    // } else {
    //   setLineChartOption({
    //     ...options,
    //     series: formatedResponse
    //   });
    // }
  };

  useEffect(() => {
    if (filter && filter.list && filter.list.length > 0) {
      checkLatestStockPrice(filter);
    } else {
      setOption({
        ...options,
        series: []
      });
      // setLineChartOption({
      //   ...options,
      //   series: []
      // });
    }
  }, [filter]);


  if (options && options.series && options.series.length === 0) {
    return <div className="no-chart-container">Chart data not available!</div>
  }

  return (
    <div className="chart-container">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Price Type</InputLabel>
        <Select
          sx={{
            width: '100%',
            maxWidth: 230,
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={stockPriceDefination}
          label="Select Price"
          onChange={(e) => handleChangePriceType(e)}
        >
          {
            priceDefination && priceDefination.map((price: any, index: number) => {
              return <MenuItem key={`menu-${index}`} value={price.value}>{price.name}</MenuItem>
            })
          }
        </Select>
      </FormControl>
      <ReactApexChart
        options={options.option}
        series={options.series}
        type={"candlestick"}
        height={320}
        width={700}
        key={stockPriceDefination === defaultValueForPriceType ? "candlestick" : "area"}
      />
    </div>
  )
};

export default memo(StockChart);