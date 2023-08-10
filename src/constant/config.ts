import { subtractYears } from "../utils";

// API end url
export const basePath = "https://finnhub.io/api/v1";

// chart configuration for all prices comparision chart
export const chartOptions = {
  chart: {
    height: 350,
    type: "candlestick",
    toolbar: {
      show: true,
      offsetX: 0,
      offsetY: 0,
      tools: {
        download: false,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
        customIcons: []
      },
      autoSelected: 'zoom'
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#3C90EB',
          downward: '#DF7D46'
        },
        wick: {
          useFillColor: true,
        }
      }
    }
  },
  xaxis: {
    labels: {
      formatter: (val: string) => {
        return new Date(val).toDateString();
      }
    }
  },
  yaxis: {
    labels: {
      formatter: (val: number) => {
        return val && val.toFixed(2);
      }
    }
  }
}

// configuration of single price chart
export const lineChartConfiguration = {
  chart: {
    type: 'area',
    height: 350,
    zoom: {
      autoScaleYaxis: true,
    },
  }
}

// chart candle request
export const initialCandleRequest = {
  from: subtractYears(),
  to: new Date(),
  list: [],
  resolution: 1
}

// dropdown values for opne, close, high, low stock price
export const PriceDefination = [
  {
    name: 'All',
    value: 'all'
  },
  {
    name: 'Open',
    value: 'o'
  },
  {
    name: 'Close',
    value: 'c'
  },
  {
    name: 'High',
    value: 'h'
  },
  {
    name: 'Low',
    value: 'l'
  }
]