import React, { memo, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { chartLineOption, chartOptions, priceTypes } from "../constant";
import { convertStockToChart, fetchHistoricalData, RequestToCandle, convertToSingleValueChart, Stock, } from "../utils";

const StockChart: React.FC<{ filter: RequestToCandle }> = ({
  filter
}) => {

  const [options, setOption] = useState<{
    series: any[],
    option: any
  }>({
    series: [],
    option: chartOptions
  });

  const [lineOptions, setLineChartOption] = useState<{
    series: any[],
    option: any
  }>({
    series: [],
    option: chartLineOption
  });


  const [stockPriceDefination, setStockPrice] = useState<string>("all");
  const [stockChartValues, setStockChartValues] = useState<Stock[]>(
    [
      {
        c: [], o: [], l: [], h: [], t: [], s: ''

      }]
  );

  const updateChart = async (req: { from: any; to: any; list: any; resolution: any; }) => {
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
      // console.log('API called error', error);

      setOption({
        ...options,
        series: []
      });
    }
  };

  const handleChangeType = (e: any) => {
    setStockPrice(e.target.value);
    const format = stockChartValues.map((d: any, index: number) => {
      const name = filter && filter.list && filter.list[index] && filter.list[index].displaySymbol;

      if (e.target.value === "all") {
        return {
          name: name,
          data: d && d['s'] === 'ok' ? convertStockToChart(d)
            : []
        }
      } else {

        return {
          name: name,
          data: d && d['s'] === 'ok' ? convertToSingleValueChart(d[e.target.value], d['t'])
            : []
        }
      }
    });

    if (e.target.value === "all") {
      setOption({
        ...options,
        series: format
      });
    } else {
      setLineChartOption({
        ...options,
        series: format
      });
    }
  };

  useEffect(() => {

    console.log(filter,filter)
    if (filter && filter.list && filter.list.length > 0) {
      updateChart(filter);
    }else{
      setOption({
        ...options,
        series: []
      });
      setLineChartOption({
        ...options,
        series: []
      });
    }
  }, [filter]);

  if (options && options.series && options.series.length == 0) {
    return <div className="no-chart-container">Chart data not available!</div>
  }
  return (
    <div className="chart-container">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Price Type</InputLabel>
        <Select
          sx={{
            width: '100%',
            maxWidth: 230,
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={stockPriceDefination}
          label="Select Price"
          onChange={(e) => handleChangeType(e)}

        >
          {
            priceTypes && priceTypes.map((price: any, index: number) => {
              return <MenuItem key={`menu${index}`} value={price.value}>{price.name}</MenuItem>
            })
          }


        </Select>
      </FormControl>
      {stockPriceDefination === "all" ?
        <ReactApexChart
          options={options.option}
          series={options.series}
          type={"candlestick"}
          height={320}
          width={700}
          key="candlestick"
        /> :
        <ReactApexChart options={lineOptions.option}
          series={lineOptions.series}
          type={"area"}
          height={320}
          width={700}
          key="area"
        />
      }
    </div>
  )
};

export default memo(StockChart);