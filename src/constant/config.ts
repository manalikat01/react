import { subtractYears } from "../utils";

// API end url
export const basePath = "https://finnhub.io/api/v1";

// chart configuration options
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
  title: {
    text: "",
    align: "left"
  },
  tooltip: {
    enabled: true
  },
  xaxis: {
    type: "category",
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

// chart candle request
export const initialCandleRequest ={
  from: subtractYears(),
  to: new Date(),
  list: [],
  resolution :'W'
}
