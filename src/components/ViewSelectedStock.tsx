import React, { memo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// View Selected Stock
const ViewStock: React.FC<{ stocksSelected: Symbol[] }> = ({
  stocksSelected
}) => {

  return (
    <div className="card-view">

      {stocksSelected && stocksSelected.length > 0 ?
        stocksSelected.map((ele: any, index: number) => {
          return (
            <Card sx={{ maxWidth: 345, margin: 2 }} key={index}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {ele.displaySymbol}
                  <Typography
                    sx={{ fontSize: 14, marginLeft: 2 }}
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
        }) : <div className="no-selected-stock">
          No stock selected yet!
        </div>
      }
    </div>
  );
};

export default memo(ViewStock);

