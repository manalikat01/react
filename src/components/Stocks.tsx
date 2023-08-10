import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button, Card, CardContent, FilterOptionsState } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, DateValidationError, LocalizationProvider } from "@mui/x-date-pickers";

import '../App.css';
import { initialCandleRequest } from "../constant";
import { useStockContext } from "../context";
import { fetchStockDetails, RequestToCandle, Symbol } from '../utils';

import StockChart from "./StockChart";
import { ViewSelectedStock } from "./ViewSelectedStock";


export const Stocks: React.FC = () => {
  const [filter, setFilterValues] = useState<RequestToCandle>(initialCandleRequest); // form values
  const [error, setError] = React.useState<DateValidationError | null>(null); // error 
  const { setStockList } = useStockContext(); // selected values from array

  const [selectedStocks, setSelectedStocks] = useState([]);
  const [list, setList] = useState([]);
  const [filterProps, setFilterProp] = useState<RequestToCandle>(initialCandleRequest);

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case 'invalidDate': {
        return 'Your date is not valid';
      }

      default: {
        return '';
      }
    }
  }, [error])

  const handleChangeStocks = (event: any, value: any) => {
    setSelectedStocks(value);
    setStockList(value);
  };

  const handleChangeDates = (e: any, key: string) => {
    setFilterValues((filter) => filter = {
      ...filter,
      [key]: dayjs(e)
    });
  };

  const handleSubmit = () => {
    // console.log({
    //   ...filter,
    //   list: selectedStocks
    // }, 'filterProps');
    setFilterProp({
      ...filter,
      list: selectedStocks
    })
  }


  const handleReset = () => {
    setSelectedStocks([]);
    setFilterValues(initialCandleRequest);
    setFilterProp({
      ...filter,
      list: []
    })
  }

  useEffect(() => {
    const getStocks = async () => {
      try {
        const response = await fetchStockDetails();
        setList(response);
      } catch (e) {
        setList([]);
      }
    }

    getStocks();

    return () => {
      setList([]);
    };
  }, []);

  const defaultFilterOptions = createFilterOptions();

  const filterOptions = (options: any[], state: any) => {
    return defaultFilterOptions(options, state).slice(0, 100);
  };
  return (
    <div className="App">
      <div className="header">
        <InfoContainer />
        <div className="filter-container">
          <div className="search-filter">
            {
              list && list.length > 0 ?
                <Autocomplete
                  multiple
                  sx={{
                    width: '100%',
                    maxWidth: 550,
                  }}
                  id="checkboxes-tags-demo"
                  options={list}
                  value={selectedStocks}
                  filterOptions={filterOptions}
                  disableCloseOnSelect
                  onChange={handleChangeStocks}
                  getOptionLabel={(option: any) => option && option.displaySymbol ? option.displaySymbol : ''}
                  getOptionDisabled={(options) => (selectedStocks.length > 2 ? true : false)}
                  renderGroup={(params) => params as unknown as React.ReactNode}
                  style={{ width: 500 }}

                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // label="Select Stocks for details view"
                      placeholder="Select stock for details view"
                    />
                  )}
                /> : <div className="no-selected-stock">
                  No stock available
                </div>
            }
          </div>
          <div className="range-filter">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onChange={(e) => handleChangeDates(e, "from")}
                value={dayjs(filter.from)}
                // onError={(newError) => setError(newError)}
                slotProps={{
                  textField: {
                    helperText: errorMessage,
                  },
                }}
                maxDate={dayjs(new Date())}
              />

              <DatePicker
                onChange={(e) => handleChangeDates(e, "to")}
                value={dayjs(filter.to)}
                minDate={dayjs(filter.from)}
                maxDate={dayjs(new Date())}
                onError={(newError) => setError(newError)}
                slotProps={{
                  textField: {
                    helperText: errorMessage,
                  },
                }}

              />
            </LocalizationProvider>



            <div className="button-container">
              <Button color="primary" size="small" variant="contained" onClick={handleSubmit}>Submit</Button>
              <Button color="primary" size="small" variant="contained" onClick={handleReset}>Reset</Button>
            </div>
          </div >
        </div>
      </div>

      <div className="main">
        <ViewSelectedStock stocksSelected={selectedStocks} />
        <StockChart filter={filterProps} />
      </div>
    </div >
  )
}


export const InfoContainer: React.FC = () => {
  return (
    <div className="title">
      US Stock Exchange
    </div>
  )
}
