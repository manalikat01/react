import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import '../App.css';
import { useStockContext } from "../context";
import { ChartFilter, fetchStockDetails, Symbol } from '../utils';
import { ViewStock } from "./ViewSelectedStock";
import { ChartFilterComponent } from "./FilterChart";
import dayjs from "dayjs";
import { rangeFilter } from "../constant";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Button, FormControl } from "@mui/material";


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// Get list of stock US exchange
const Stocks: React.FC<{ symbolList: Symbol[] }> = ({
  symbolList
}) => {
  const [checked, setChecked] = useState<Symbol[]>([]);
  const { setStockList } = useStockContext();

  useEffect(() => {
    setStockList(checked);
  }, [checked, setStockList]);

  const currentIndex = (checked: Symbol[], value: Symbol) => checked.findIndex((v: Symbol) => v.symbol === value.symbol);
  const isChecked = (symbol: string) => checked.find((ele) => ele.symbol === symbol) ? true : false

  const handleToggle = (value: Symbol) => () => {
    const newChecked = [...checked];
    const currentIndex = checked.indexOf(value);

    if (currentIndex === -1) {
      if (checked.length < 3) {
        newChecked.push(value);
        setChecked(newChecked);
      }
    } else {
      newChecked.splice(currentIndex, 1);
      setChecked(newChecked);
    }
  }


  return (
    <List
      dense
      sx={{
        width: "100%",
        maxWidth: 280,
        bgcolor: "background.paper"
      }}
    >

      {symbolList.map((value, index) => {
        const labelId = `checkbox-list-secondary-label-${value.symbol}`;
        return (

          <ListItem
            key={`list-${index}`}
            secondaryAction={
              <Checkbox
                key={`checkbox-${index}`}
                edge="end"
                onChange={handleToggle(value)}
                checked={isChecked(value.symbol)}
                inputProps={{ "aria-labelledby": labelId }}
                disabled={checked.length > 3 && currentIndex(checked, value) === -1}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemText
                primary={value.symbol}
                secondary={
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {value.description}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

// show paginationa for  list
const GetStocks: React.FC = () => {
  const [stocks, setStocks] = useState([]);
  const [page, setPage] = useState(1);
  const [stocksData, setStocksData] = useState([]);
  const pageSize = 10;
  const [count, setCount] = useState(1)

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetchStockDetails();
        setStocks(response);
      } catch (e) {
        setStocks([]);
      }
    }

    dataFetch();

    return () => {
      setStocks([]);
    };
  }, []);

  // useEffect(() => {
  //   if (stocks && stocks.length > 0) {
  //     const pages = Math.ceil(stocks.length / pageSize);
  //     setCount(pages)
  //     setStocksData(stocks.slice((page * pageSize) - pageSize, page * pageSize));
  //   }
  // }, [page, stocks])


  return <div className='nav'>
    <Card className="header">
      US Stock Exchange
      <CardContent>You can select at most 3 stock for  detail pricing</CardContent>
    </Card>
    {/* {stocks && stocks.length > 0
      ?
      <SearchFilter stocks={stocks} /> : <div className="no-data">Loading Stocks</div>
    } */}
  </div>
}

const SearchFilter: React.FC =() => {
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [stockList, setStocksList] = useState([]);
  const { setStockList } = useStockContext();

  useEffect(() => {
    const getStocks = async () => {
      try {
        const response = await fetchStockDetails();
        setStocksList(response);
      } catch (e) {
        setStocksList([]);
      }
    }

    getStocks();

    return () => {
      setStocksList([]);
    };
  }, []);

  const handleChange = (event: any, value: any) => {
    setSelectedStocks(value);
    setStockList(value);
  }
  if(stockList && stockList.length > 0){
    return (
      <Autocomplete
        multiple
        sx={{
          width: '100%',
          maxWidth: 550,
        }}
        id="checkboxes-tags-demo"
        options={stockList}
        disableCloseOnSelect
        onChange={handleChange}
        getOptionLabel={(option: Symbol) => option && option.displaySymbol ? option.displaySymbol : ''}
        getOptionDisabled={(options) => (selectedStocks.length > 2 ? true : false)}
        renderGroup={(params) => params as unknown as React.ReactNode}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Stocks for details view"
            placeholder="Select stock for details view"
          />
        )}
      />
  
    );
  }else{
    return <div className="no-selected-stock">
    No stock available
</div>
  }
 
}

const RangeFilter: React.FC<{ stocks: Symbol[] }> = ({
  stocks
}) => {
  const [filter, setFilterValues] = useState(rangeFilter);

  const handleChange = (e: any, key: string) => {
    setFilterValues((filter) => filter = {
      ...filter,
      [key]: dayjs(e)
    });
  };

  const handleSubmit = () => {
    // updateFilter(
    //   filter
    // );
  }

  return (
    <div className="range-filter">
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <FormControl fullWidth>
        <DatePicker
          onChange={(e) => handleChange(e, "from")}
          maxDate={dayjs(new Date())}
          value={filter.from}
        />
      </FormControl>
      <FormControl fullWidth>
        <DatePicker
          onChange={(e) => handleChange(e, "to")}
          value={filter.to}
          minDate={filter.from}
          maxDate={dayjs(new Date())}
        />
      </FormControl>      
      <div className="button-container">
      <Button color="primary" size="small" variant="contained" onClick={handleSubmit}>Submit</Button>
      <Button color="primary" size="small" variant="contained" onClick={handleSubmit}>Reset</Button>  
      </div>
    </LocalizationProvider>
    </div>

  );
}

export { Stocks, GetStocks, SearchFilter, RangeFilter };