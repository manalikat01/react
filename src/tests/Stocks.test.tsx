/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable jest/valid-expect */
import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { GetStocks, Stocks } from '../components';
import { mockStockDetails } from '../utils';


describe('Render Stocks Available', () => {
    it('should render stock static UI', async () => {
        const { container } = renderStocks();
        expect(container.firstChild).toHaveClass('nav');
        expect(screen.getByText('US Stock Exchange'));
        expect(screen.getByText('You can select at most 3 stock for detail pricing'));

    });
    it('should render list of stocks with data', async () => {
        const { container } = await act(async () => render(<Stocks symbolList={mockStockDetails} />));
        expect(screen.getByText('GIGM'));
        expect(screen.getByText('INTEGRATED WELLNESS ACQ - A'));
        const checkbox = container.querySelectorAll("input[type='checkbox']")[0] as HTMLInputElement;
        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(true);
    });

    it('should render data block', async () => {
        await act(async () => render(<Stocks symbolList={[]} />));
    });
});

const renderStocks = () => {
    return render(<GetStocks />
    )
}

