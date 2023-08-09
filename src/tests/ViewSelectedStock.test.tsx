/* eslint-disable testing-library/await-async-query */
/* eslint-disable jest/valid-expect */
/* eslint-disable testing-library/no-node-access */

import { render, screen } from '@testing-library/react';
// import { ViewStock } from '../components/ViewSelectedStock';
import { StockContext } from '../context';
import { mockStockDetails } from '../utils';


describe('Render Stocks Selected', () => {
    it('should render list of selected stocks in card view', () => {
        const { container } = renderSelectedStockCard(mockStockDetails);
        expect(container.firstChild).toHaveClass('card');
        expect(screen.getByText('GIGM'));
        expect(screen.getAllByText('USD'));
        expect(screen.getByText('INTEGRATED WELLNESS ACQ - A'));

    });

    it('should render no data block', () => {
        const { container } = renderSelectedStockCard([]);
        expect(container.firstChild).toHaveClass('card');
        expect(screen.getByText('No stock selected yet!'));
    });
});


const renderSelectedStockCard = (val: any) => {
    return render(
        <StockContext.Provider value={{
            stockList: val,
            setStockList: () => { }
        }} >
            {/* <ViewStock /> */}
        </StockContext.Provider>
    )
}
