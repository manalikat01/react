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
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';

import '../App.css';
import { useStockContext } from "../context";
import { fetchStockDetails, Symbol } from '../utils';

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
      try{
        const response = await fetchStockDetails();
        setStocks(response);
      }catch(e){
        setStocks([]);
      }
    }

    dataFetch();

    return () => {
      setStocks([]);
    };
  }, []);

  useEffect(() => {
    if (stocks && stocks.length > 0) {
      const pages = Math.ceil(stocks.length / pageSize);
      setCount(pages)
      setStocksData(stocks.slice((page * pageSize) - pageSize, page * pageSize));
    }
  }, [page, stocks])


  return <div className='nav'>
    <Card className="header">
        US Stock Exchange
      <CardContent>You can select at most 3 stock for  detail pricing</CardContent>
    </Card>
    {!stocks


      ? <div className="no-data">Loading Stocks</div>
      : <><SearchStocks stocks={stocks} />
        <Stocks symbolList={stocksData} /></>
    }

    <Pagination count={count}
      onChange={(event, value) => setPage(value)} variant="outlined" shape="rounded" />
  </div>
}

// Request list of stocks 
// const useStockData = () => {
//   const [state, setState] = useState([]);

//   useEffect(() => {
//     const dataFetch = async () => {
//       setState(data);
//     };

//     dataFetch();
//     return () => {
//       setState([]);
//     };
//   }, []);

//   return state;
// };



// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SearchStocks: React.FC<{ stocks: Symbol[] }> = ({
  stocks
}) => {
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={stocks}
      disableCloseOnSelect
      getOptionLabel={(option) => option.displaySymbol}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            edge="end"
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.displaySymbol}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Checkboxes" placeholder="Stocks" />
      )}
    />
  );
}

export { Stocks, GetStocks };