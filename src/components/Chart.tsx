import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Card from '@mui/material/Card';

import { chartOptions, rangeFilter } from "../constant";
import { useStockContext } from "../context";
import { ChartFilterComponent } from './FilterChart';
import { convertDateToUnixTimestamp, convertStockToChart, ChartFilter, ChartSeries, fetchHistoricalData, Stock, } from "../utils";

export const StockChart: React.FC = () => {
  const { stockList } = useStockContext()
  const [req, setReq] = useState<ChartFilter>(rangeFilter)

  const [options, setOption] = useState<{
    series: ChartSeries[],
    option: any
  }>({
    series: [],
    option: chartOptions
  });


  const updateFilter = (input: ChartFilter) => {
    setReq({
      ...req,
      ...input
    });
  }

  const updateChart = async () => {
    try {
      const result = await fetchHistoricalData(
        req.resolution,
        req.from ? convertDateToUnixTimestamp(new Date(req.from)) : 0,
        convertDateToUnixTimestamp(new Date(req.to)),
        stockList
      );

      // format data as per chart
      const format = result.map((res: Stock, index: number) => {
        return {
          name: stockList[index].symbol,
          data: res && res['s'] === 'ok' ? convertStockToChart(res) : []
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


  useEffect(() => {
    updateChart();
  }, [stockList, req])


  return (
    <div className="chart-container">
      <ChartFilterComponent updateFilter={(input) => updateFilter(input)} />
      {
        options && options.series && options.series.length > 0 && stockList && stockList.length > 0 ?
          <ReactApexChart
            options={options.option}
            series={options.series}
            type="candlestick"
            height={320}
          />
          :
          <Card className="no-chart">Data not available!</Card>
      }
    </div>
  )
};
