import React, { memo, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Card from '@mui/material/Card';

import { chartOptions } from "../constant";
import {  convertStockToChart,  ChartSeries, fetchHistoricalData,  RequestToCandle, } from "../utils";

const Chart: React.FC<{ filter: RequestToCandle }> = ({
  filter
}) => {

  const [options, setOption] = useState<{
    series: ChartSeries[],
    option: any
  }>({
    series: [],
    option: chartOptions
  });

  const updateChart = async () => {
    try {
      const result = await fetchHistoricalData(
        filter.resolution,
        filter.from,
        filter.to,
        filter.list
      );

      // format data as per chart
      const format = result.map((res: any, index: number) => {
        return {
          name: 'Chart' + index,
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
    if(filter && filter.list && filter.list.length >0){
      updateChart();
    }
  }, [filter]);

  return (
    <div className="chart-container">
      {
        options && options.series && options.series.length > 0 && filter.list && filter.list.length > 0 ?
          <ReactApexChart
            options={options.option}
            series={options.series}
            type="candlestick"
            height={320}
            width={550}
          />
          :
          <Card className="no-chart">Data not available!</Card>
      }
    </div>
  );
};

export default memo(Chart);