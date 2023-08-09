/* eslint-disable no-restricted-globals */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable jest/valid-expect */
import React from 'react';
import { act, render } from '@testing-library/react';
// import { StockChart } from "../components";
import { mockStockChartOptions } from '../utils';


describe('Render Chart for selected Stock', () => {
   // it('should render chart container', async () => {
   //    jest.spyOn(React, 'useState').mockReturnValueOnce([mockStockChartOptions, jest.fn()]);
   //    const { container } = await act(async () => render(<StockChart />));
   //    expect(container.firstChild).toHaveClass('chart-container');
   // });

   // it('should render no chart container', async () => {
   //    const options = {}
   //    jest.spyOn(React, 'useState').mockReturnValueOnce([options, jest.fn()]);

   //    const { container } = await act(async () => render(<StockChart />));
   //    expect(container.firstChild).toHaveClass('chart-container');
   //    expect(container.getElementsByClassName('no-chart'));
   // });
});
