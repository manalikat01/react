/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable no-restricted-globals */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable jest/valid-expect */
import { act, render, screen, waitFor } from '@testing-library/react';

import { test } from '@jest/globals';
import App from './App';
import { InfoContainer, Stocks, ViewSelectedStock } from './components';
import { mockRequestForCandel, mockStockDetails } from './utils';
import { StockContext } from './context';
import StockChart from './components/StockChart';
import userEvent from '@testing-library/user-event';
import React from 'react';

// test('Renders Root component', async () => {
//     const { container } = await act(async () => render(<App />));
//     expect(container.firstChild).toHaveClass('App');
// });

// test('should render stock information UI', async () => {
//     const { container } = render(<InfoContainer />);
//     expect(container.firstChild).toHaveClass('title');
//     expect(screen.getByText('US Stock Exchange'));
// });


// describe('Render Selected Stocks Card Container', () => {
//     test('should render no data block', async () => {
//         const {container} = render(<ViewSelectedStock stocksSelected={[]} />);
//         expect(container.firstChild).toHaveClass('card-view');
//         expect(screen.getByText('No stock selected yet!'));

//     });
//     test('should render data block', async () => {
//         const {container} = render(<ViewSelectedStock stocksSelected={mockStockDetails} />);
//         expect(container.firstChild).toHaveClass('card-view');
//         expect(screen.getByText('GIGM'));
//         expect(screen.getByText('USD'));
//         expect(screen.getByText('BBG000BQGYG0'));
//         expect(screen.getByText('GIGAMEDIA LTD'));
//     });
// });

describe('Render Filter Container Container', () => {

    it('should render search input', async () => {
        jest.spyOn(React, 'useState').mockReturnValueOnce([mockStockDetails, jest.fn()]);
        const { container } = await act(async () => render(<Stocks />));
        expect(container.getElementsByClassName('search-filter').length).toBe(1);
        expect(container.getElementsByClassName('search-filter').length).toBe(1);

    });

    it('should hide search input if data not available', async () => {
        jest.spyOn(React, 'useState').mockReturnValueOnce([[], jest.fn()]);
        const { container } = await act(async () => render(<Stocks />));
        expect(container.getElementsByClassName('no-selected-stock').length).toBe(1);

    });


    // test('should render all inputs', async () => {
    //     const searchInput = screen.getByTestId("autocomplete-input");
    //     expect(searchInput).toBeInTheDocument();
    //     // expect(inputEl).toHaveAttribute("text", "date");
    
    //     const fromDate = screen.getByTestId("from-date");
    //     expect(fromDate).toBeInTheDocument();

    //     const toDate = screen.getByTestId("to-date");
    //     expect(toDate).toBeInTheDocument();
    //     // const { container } = await act(async () => render(<Stocks />));
    //     // expect(container.firstChild).toHaveClass('filters');
    //     // expect(screen.getByText('Resolution'));
    //     // expect(screen.getByText('No stock available'))
    //     // expect(screen.getByDisplayValue("01/01/1970")).toBeInTheDocument();

    //     // // Select Button with Submit Text
    //     // await waitFor(() => {
    //     //     const submitBtn = screen.getByText('Submit')
    //     //     userEvent.click(submitBtn);
    //     // });

    //     // await waitFor(() => {
    //     //     const resetBtn = screen.getByText('Reset')
    //     //     userEvent.click(resetBtn);
    //     // });
    // });

      
    // test('should render no chart block', async () => {
    //     const {container} = render(<StockChart filter={
    //         mockRequestForCandel
    //     } />)
    //     expect(container.firstChild).toHaveClass('card-view');
    //     expect(screen.getByText('GIGM'));
    //     expect(screen.getByText('USD'));
    //     expect(screen.getByText('BBG000BQGYG0'));
        // expect(screen.getByText('Chart data not available!'));
    // });
});

// const renderSelectedStockCard = (val: any) => {
//     return render(
//         <StockContext.Provider value={{
//             stockList: val,
//             setStockList: () => { }
//         }} >
//             <ViewSelectedStock stocksSelected={val}/>
//         </StockContext.Provider>
//     )
// }