import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { DatePicker, DateValidationError } from "@mui/x-date-pickers";

import "../App.css";
import { useStockContext } from "../context";
import { fetchStockDetails } from "../utils";
import {
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { ViewSelectedStock } from "./ViewSelectedStock";
import { ElevatorSharp } from "@mui/icons-material";
import { defaultValueForPriceType, priceDefination } from "../constant";

/* Here added limit on the stocks available upto 1000 */
const defaultFilterOptions = createFilterOptions();
const filterOptions = (options: any[], state: any) => {
  return defaultFilterOptions(options, state).slice(0, 1000);
  // return filtered.filter((option) =>
  //   option.description
  //     .toLowerCase()
  //     .trim()
  //     .includes(state.inputValue.toLowerCase().trim())
  // );
};

const AutocompleteStyle = {
  width: "100%",
  maxWidth: 550,
};

/*Search Component for searching available stocks */
const SearchContainer: React.FC<{ isSubmitClicked: boolean }> = ({
  isSubmitClicked,
}) => {
  const { selectedStocks, setSelectedStocks } = useStockContext();
  const [stocks, setStocksAvailable] = useState([]);
  const [error, setError] = useState<boolean>(false);

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
  const errorMessageSearch = React.useMemo(() => {
    const isCheck =
      isSubmitClicked && selectedStocks && selectedStocks.length === 0;
    setError(isCheck);

    return isCheck ? "Please select stocks !" : null;
  }, [isSubmitClicked, selectedStocks]);

  useEffect(() => {});
  return (
    <div className="search-filter">
      <Autocomplete
        multiple
        sx={AutocompleteStyle}
        data-testid="autocomplete-input"
        options={stocks}
        value={selectedStocks}
        // filterOptions={(options, state) => {
        // const displayOptions = filterOptions.filter((option) =>
        //   option.description
        //     .toLowerCase()
        //     .trim()
        //     .includes(state.inputValue.toLowerCase().trim()),
        // );

        //   return displayOptions;
        // }}
        filterOptions={filterOptions}
        renderOption={(props, option: any) => {
          return (
            <li {...props} key={option.symbol + "" + option.id}>
              {option?.description}
            </li>
          );
        }}
        onChange={handleChangeStocks}
        getOptionLabel={(option: any) =>
          option && option.description ? option.description : ""
        }
        getOptionDisabled={(options) =>
          selectedStocks && selectedStocks.length > 2 ? true : false
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Stock"
            placeholder="Enter Symbol or Keyword"
            error={error}
            helperText={errorMessageSearch}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {stocks && stocks.length == -0 ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
        // renderOption={(props, option) => {

        //   return (
        //     <li {...props}>
        //      {/* {option?.description} */}
        //     </li>
        //   );
        // }}
      />
      <ViewSelectedStock />
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
  isSubmitClicked: boolean;
}> = ({
  handleSelectedDates,
  name,
  minDate,
  maxDate,
  defaultValue,
  isSubmitClicked,
}) => {
  const [error, setError] = React.useState<DateValidationError | null>(null);
  const [currentVal, setCurrentValue] = useState(null);

  const errorMessageDate = React.useMemo(() => {
    const isCheck = isSubmitClicked && error;
    switch (error) {
      case "maxDate":
      case "minDate": {
        return "Please select valid date range!";
      }
      case "invalidDate": {
        return "Your date is not valid!";
      }
      default: {
        return "";
      }
    }
  }, [error, minDate, maxDate]);

  const handleChangeDates = (e: any) => {
    handleSelectedDates(e, name);
    setCurrentValue(currentVal);
  };

  useEffect(() => {
    console.log(defaultValue);
    handleChangeDates(defaultValue);
  }, [defaultValue]);
  return (
    <DatePicker
      defaultValue={dayjs(defaultValue)}
      onError={(newError) => setError(newError)}
      onChange={(e) => handleChangeDates(e)}
      slotProps={{
        textField: {
          helperText: error ? errorMessageDate : "",
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

const TogglePrice: React.FC<{
  handlePrice: (selectedPrice: any) => void
}> = ({
  handlePrice
}) => {
  const [stockPriceDefination, setStockPriceDefination] = useState<string>(
    defaultValueForPriceType
  );
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    console.log(newAlignment,'newAlignment')
    setStockPriceDefination(newAlignment);
    handlePrice(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={stockPriceDefination}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      className="toggle-price"
    >
      {priceDefination &&
        priceDefination.map((price: any, index: number) => {
          return (
            <ToggleButton key={`menu-${index}`} value={price.value}>
              {price.name}
            </ToggleButton>
          );
        })}
    </ToggleButtonGroup>
  );
};
export { DateInput, SearchContainer, TogglePrice };
