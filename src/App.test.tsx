/* eslint-disable no-restricted-globals */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable jest/valid-expect */
import { act, render, screen } from '@testing-library/react';

import { test } from '@jest/globals';
import App from './App';
import { InfoContainer, ViewSelectedStock } from './components';
import { mockRequestForCandel, mockStockDetails } from './utils';
import { StockContext } from './context';
import StockChart from './components/StockChart';

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

    // test('should render no data block', async () => {
        // const {container} = render(<Chart filter={[]} />);
    //     expect(container.firstChild).toHaveClass('card-view');
    //     expect(screen.getByText('No stock selected yet!'));

    // });

    // test('should render data block', async () => {
    //     const {container} = render(<StockChart filter={
    //         mockRequestForCandel
    //     } />)
    //     expect(container.firstChild).toHaveClass('card-view');
    //     expect(screen.getByText('GIGM'));
    //     expect(screen.getByText('USD'));
    //     expect(screen.getByText('BBG000BQGYG0'));
    //     expect(screen.getByText('GIGAMEDIA LTD'));
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