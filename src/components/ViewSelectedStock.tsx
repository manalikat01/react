import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { useStockContext } from '../context';

// View Selected Stock Cards
export const ViewSelectedStock: React.FC = () => {
  const { selectedStocks } = useStockContext()

  useEffect(()=>{
    console.log(selectedStocks,'selectedStocks')
  },[selectedStocks])
  return (
    <div className="card-view">
      {selectedStocks && selectedStocks.length > 0 ?
        selectedStocks.map((ele: any, index: number) => {
          return (
            <Card sx={{ maxWidth: 345, margin: 2 }} key={`${index}`+  ele.symbol}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {ele.symbol}
                </Typography>
                <Typography variant="body2"> {ele.description}</Typography>
              </CardContent>
            </Card>
          );
        }) : null
        //  : <div className="no-selected-stock">
        //   No stock selected yet!
        // </div>
      }
    </div>
  );
};

// Title static element
export const InfoContainer: React.FC = () => {
  return (
    <div className="title">
      US Stock Exchange
    </div>
  )
}