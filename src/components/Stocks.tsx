import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, DateValidationError, LocalizationProvider } from "@mui/x-date-pickers";

import '../App.css';
import { initialCandleRequest } from "../constant";
import { useStockContext } from "../context";
import { fetchStockDetails, RequestToCandle, Symbol } from '../utils';

import StockChart from "./StockChart";
import { ViewSelectedStock } from "./ViewSelectedStock";


const defaultFilterOptions = createFilterOptions();

const filterOptions = (options: any[], state: any) => {
  return defaultFilterOptions(options, state).slice(0, 100);
};

export const SearchContainer: React.FC<{
  handleSelectedStocks: (selectedStocks: Symbol[]) => void,
  updatedStocks: Symbol[]
}> = ({
  handleSelectedStocks,
  updatedStocks
}) => {
    const { selectedStocks, setSelectedStocks } = useStockContext()
    const [stocks, setStocksAvailable] = useState([]);

    const handleChangeStocks = (event: any, value: any) => {
      setSelectedStocks(value);
      handleSelectedStocks(value)
      // setError(value < 3);
      
    };


    useEffect(() => {
      const getStocks = async () => {
        try {
          const response = await fetchStockDetails();
          setStocksAvailable(response);
        } catch (e) {
          setStocksAvailable([]);
        }
      }

      getStocks();

      return () => {
        setStocksAvailable([]);
      };
    }, []);

    useEffect(() => {
      console.log(updatedStocks, 'updatedStocks');
      // setSelectedStocks(updatedStocks);

    }, [updatedStocks])

    return <div className="search-filter">
      <Autocomplete
        multiple
        sx={{
          width: '100%',
          maxWidth: 550,
        }}
        data-testid="autocomplete-input"
        options={stocks}
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
            placeholder="Select stock for details view"
          // error={error}
          // helperText={error && "You can select at most 3 stock!"}
          />
        )}
      />
    </div>
  }


export const DateInput: React.FC<{
  handleSelectedDates: (selectedDates: any, name: string) => void;
  name: string;
  minDate?: Date;
  maxDate?: Date;
  defaultValue: Date
}> = ({ handleSelectedDates, name, minDate, maxDate, defaultValue }) => {
  const [error, setError] = React.useState<DateValidationError | null>(null);

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case 'maxDate':
      case 'minDate': {
        return 'Please select valid date range';
      }

      case 'invalidDate': {
        return 'Your date is not valid';
      }

      default: {
        return '';
      }
    }
  }, [error]);

  useEffect(() => {
    console.log(error, 'error');
  }, [error]);

  const handleChangeDates = (e: any) => {
    if (!error && errorMessage == '') {
      handleSelectedDates(e, name);
    } else {
      handleSelectedDates(null, name);
    }
  };
  return (
    <DatePicker
      defaultValue={dayjs(defaultValue)}
      onError={(newError) => setError(newError)}
      onChange={(e) => handleChangeDates(e)}
      slotProps={{
        textField: {
          helperText: error ? errorMessage : '',
        },
      }}

      minDate={dayjs(minDate)}
      maxDate={dayjs(maxDate)}

    />
  );
};

export const Stocks: React.FC = () => {
  const [filter, setFilterValues] = useState<RequestToCandle>(initialCandleRequest); // form values

  const [selectedStocks, setSelectedStocks] = useState<Symbol[]>([]);
  const [filterProps, setFilterProp] = useState<RequestToCandle>(initialCandleRequest);



  const handleSubmit = () => {
    if (filter && filter.from && filter.to) {
      setFilterProp({
        ...filter,
        list: selectedStocks
      })
    }
  }


  const handleReset = () => {
    setSelectedStocks([]);
    setFilterValues(initialCandleRequest);
    setFilterProp({
      ...filter,
      list: []
    })
  }


  const handleSelectedStocks = (selectedStocks: Symbol[]) => {
    setSelectedStocks(selectedStocks);
    setFilterValues({
      ...filter,
      list: selectedStocks
    })
  }

  const handleSelectedDates = (e: any, name: string) => {
    console.log(e, name);
    setFilterValues({
      ...filter,
      [name]: e
    })

  };

  return (
    <div className="App">
      <div className="header">
        <InfoContainer />
        <div className="filter-container">
          <SearchContainer handleSelectedStocks={handleSelectedStocks} updatedStocks={filter.list} />
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
              <Button color="primary" size="small" variant="contained" disabled={true} onClick={handleSubmit}>Submit</Button>
              <Button color="primary" size="small" variant="contained" onClick={handleReset}>Reset</Button>
            </div>
          </div >
        </div>
      </div>

      <div className="main">
        <ViewSelectedStock />
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
