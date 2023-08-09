import dayjs from "dayjs";

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
        return val.toFixed(2);
      }
    }
  }
}

// range filter for chart
export const rangeFilter = {
  from: dayjs(0),
  to: dayjs(new Date()),
  resolution: 'W',
}

// resolution possible values
export const Resolution = [
  1, 5, 15, 30, 60, 'D', 'W', 'M'
];
