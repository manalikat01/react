import React, { useState } from "react";
import dayjs from "dayjs";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "../App.css";
import { Resolution } from '../constant';

export const ChartFilterComponent: React.FC<{ updateFilter: (date: any) => void }> = ({ updateFilter }) => {

  const [filter, setFilterValues] = useState({
    from: dayjs(0),
    to: dayjs(new Date()),
    resolution: 'W'
  });

  const handleChange = (e: any, key: string) => {
    setFilterValues((filter) => filter = {
      ...filter,
      [key]: dayjs(e)
    });
  };

  const handleSubmit = () => {
    updateFilter(
      filter
    );
  }

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setFilterValues({
      ...filter,
      [event.target.name]: event.target.value as string
    });
  };

  return (
    <div className="filters">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Resolution</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter.resolution}
          label="resolution"
          onChange={handleChangeSelect}
          name="resolution"
        >
          {Resolution.map((ele: any, index: number) => {
            return <MenuItem key={`res${index}`} value={ele}>{ele}</MenuItem>
          })}
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <div className="date-range">
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
          <Button color="primary" size="small" variant="contained" onClick={handleSubmit}>Submit</Button>
        </div>
      </LocalizationProvider>
    </div>
  );
}