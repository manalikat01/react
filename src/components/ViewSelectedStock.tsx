import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { useStockContext } from '../context';
import { Symbol } from '../utils';

// View Selected Stock
export const ViewStock: React.FC = () => {
  const { stockList } = useStockContext();

  return (
    <div className="card">

    {stockList && stockList.length > 0 ?
        stockList.map((ele: Symbol, index: number) => {
          return (
            <Card sx={{ maxWidth: 345, margin: 2 }} key={index}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {ele.displaySymbol}
                  <Typography
                    sx={{ fontSize: 14 , marginLeft: 2 }}
                    color="text.secondary"
                    gutterBottom
                    component="span"
                  >
                    {ele.currency}
                  </Typography>
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                  component="span"
                >
                  {ele.figi} - {ele.type}
                </Typography>
                <Typography variant="body2"> {ele.description}</Typography>
              </CardContent>
            </Card>
          );
        })
        : <Card className="no-selected-stock">
            No stock selected yet!
        </Card>
      }
    </div>
  );
};