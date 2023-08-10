import { subtractYears } from "../helpers";

export const mockStockDetails = [{
    "currency": "USD",
    "description": "GIGAMEDIA LTD",
    "displaySymbol": "GIGM",
    "figi": "BBG000BQGYG0",
    "isin": null,
    "mic": "XNAS",
    "shareClassFIGI": "BBG001SDX8R5",
    "symbol": "GIGM",
    "symbol2": "",
    "type": "Common Stock"
    },
];

export const mockRequestForCandel= {
    from: subtractYears(),
    to: new Date(),
    list: [],
    resolution: 1
  }

export const mockStockChartOptions = {
    series: [
        {
            x: new Date(1538778600000),
            y: [6629.81, 6650.5, 6623.04, 6633.33]
        },
        {
            x: new Date(1538780400000),
            y: [6632.01, 6643.59, 6620, 6630.11]
        },
        {
            x: new Date(1538782200000),
            y: [6630.71, 6648.95, 6623.34, 6635.65]
        },
        {
            x: new Date(1538784000000),
            y: [6635.65, 6651, 6629.67, 6638.24]
        },
        {
            x: new Date(1538785800000),
            y: [6638.24, 6640, 6620, 6624.47]
        },
    ],
    option: {
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
                formatter: function (val: string) {
                    return new Date(val).toDateString();
                }
            }
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    }
};
