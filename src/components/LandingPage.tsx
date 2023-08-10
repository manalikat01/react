import React, { useState, useEffect, useContext } from "react";
import { Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "../App.css";
import { initialCandleRequest } from "../constant";
import { useStockContext } from "../context";
import { RequestStockPrices } from "../utils";

import StockChart from "./StockChart";
import { InfoContainer, ViewSelectedStock } from "./ViewSelectedStock";
import { DateInput, SearchContainer } from "./InputComponents";
import { LocalizationProvider } from "@mui/x-date-pickers";

export const LandingPage: React.FC = () => {
  const [filter, setFilterValues] =
    useState<RequestStockPrices>(initialCandleRequest); 
  const { selectedStocks, setSelectedStocks } = useStockContext();
  const [filterProps, setFilterProp] =
    useState<RequestStockPrices>(initialCandleRequest);

  const handleSubmit = () => {
    if (filter && filter.from && filter.to) {
      setFilterProp({
        ...filter,
        list: selectedStocks,
      });
    }
  };

  const handleReset = () => {
    setFilterValues(initialCandleRequest);
    setSelectedStocks([]);
    setFilterProp({
      ...filter,
      list: [],
    });
  };

  const handleSelectedDates = (e: any, name: string) => {
    setFilterValues({
      ...filter,
      [name]: e,
    });
  };

  return (
    <div className="App">
      <div className="header">
        <InfoContainer />
        <div className="filter-container">
          <SearchContainer />
          <div className="range-filter">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateInput
                handleSelectedDates={handleSelectedDates}
                name="from"
                minDate={
                  new Date(new Date().setFullYear(new Date().getFullYear() - 5))
                }
                maxDate={new Date()}
                defaultValue={filter.from}
              />
              <DateInput
                handleSelectedDates={handleSelectedDates}
                name="to"
                minDate={filter.from}
                maxDate={new Date()}
                defaultValue={filter.to}

              />
            </LocalizationProvider>
            <div className="button-container">
              <Button
                color="primary"
                size="small"
                variant="contained"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                color="primary"
                size="small"
                variant="contained"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="main">
        <ViewSelectedStock />
        <StockChart filter={filterProps} />
      </div>
    </div>
  );
};
