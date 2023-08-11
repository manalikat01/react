import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { DatePicker, DateValidationError } from "@mui/x-date-pickers";

import "../App.css";
import { useStockContext } from "../context";
import { fetchStockDetails } from "../utils";

/* Here added limit on the stocks available upto 1000 */
const defaultFilterOptions = createFilterOptions();
const filterOptions = (options: any[], state: any) => {
  return defaultFilterOptions(options, state).slice(0, 1000);
};

const AutocompleteStyle = {
  width: "100%",
  maxWidth: 550,
};

/*Search Component for searching available stocks */
const SearchContainer: React.FC<{ error: boolean }> = ({ error }) => {
  const { selectedStocks, setSelectedStocks } = useStockContext();
  const [stocks, setStocksAvailable] = useState([]);
  const handleChangeStocks = (event: any, value: any) => {
    setSelectedStocks(value);
  };

  /*Request Stock available in US Exchange */
  const getStocks = async () => {
    try {
      const response = await fetchStockDetails();
      setStocksAvailable(response);
    } catch (e) {
      setStocksAvailable([]);
    }
  };

  useEffect(() => {
    getStocks();
    return () => {
      setStocksAvailable([]);
    };
  }, []);

  // error messages for autocomplete
  const errorMessage = React.useMemo(() => {
    const stockCount =
      error && selectedStocks && selectedStocks.length
        ? selectedStocks.length
        : 0;
    if (error) {
      switch (stockCount) {
        case 0: {
          return "Plesse select stock!";
        }

        default: {
          return null;
        }
      }
    } else {
      return null;
    }
  }, [error, selectedStocks]);

  return (
    <div className="search-filter">
      <Autocomplete
        multiple
        sx={AutocompleteStyle}
        data-testid="autocomplete-input"
        options={stocks}
        value={selectedStocks}
        filterOptions={filterOptions}
        disableCloseOnSelect
        onChange={handleChangeStocks}
        getOptionLabel={(option: any) =>
          option && option.displaySymbol ? option.displaySymbol : ""
        }
        getOptionDisabled={(options) =>
          selectedStocks.length > 2 ? true : false
        }
        renderGroup={(params) => params as unknown as React.ReactNode}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Select stock for details view"
            error={error}
            helperText={errorMessage}
          />
        )}
        autoHighlight
      />
    </div>
  );
};

/*Date Component for range filter */
const DateInput: React.FC<{
  handleSelectedDates: (selectedDates: any, name: string) => void;
  name: string;
  minDate?: Date;
  maxDate?: Date;
  defaultValue: Date;
}> = ({ handleSelectedDates, name, minDate, maxDate, defaultValue }) => {
  const [error, setError] = React.useState<DateValidationError | null>(null);

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case "maxDate":
      case "minDate": {
        return "Please select valid date range";
      }

      case "invalidDate": {
        return "Your date is not valid";
      }

      default: {
        return "";
      }
    }
  }, [error]);

  const handleChangeDates = (e: any) => {
    if (!error && errorMessage === "") {
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
      label={name}
      slotProps={{
        textField: {
          helperText: error ? errorMessage : "",
        },
      }}
      minDate={dayjs(minDate)}
      maxDate={dayjs(maxDate)}
      format="DD-MM-YYYY"
     
      // onSelectedSectionsChange={}={params => (
      //   <TextField
      //     {...params}
      //     InputProps={{
      //       readOnly: true,
      //     sx={{
      //       "& .MuiInputBase-input": {
      //         caretColor: 'transparent'
      //       }
      //     }}
      //   />
      // )}
    />
  );
};

export { DateInput, SearchContainer };
