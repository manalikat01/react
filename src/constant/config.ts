import { subtractYears } from "../utils";

// API end url
export const basePath = "https://finnhub.io/api/v1";

// Chart configuration for all prices comparision chart
export const candlestickChartOptions = {
  chart: {
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


// Request data for stock prices API
export const initialCandleRequest = {
  from: subtractYears(),
  to: new Date(),
  list: [],
  resolution: 1
}

// Response data for stock prices API
export const initialCandleResponse = [{
  c: [], o: [], l: [], h: [], t: [], s: ''
}]


// Configuration of chart specific to single price type
export const lineChartConfiguration = {
  chart: {
    type: 'area',
    height: 350,
    zoom: {
      autoScaleYaxis: true,
    },
  }
}

// Dropdown values for opne, close, high, low stock price
export const priceDefination = [
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

// Dropdown default value for price type input;
export const defaultValueForPriceType = "all";