/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable jest/valid-expect */
import { act, render } from '@testing-library/react';
import { test } from '@jest/globals';
import App from './App';
import { InfoContainer } from './components';

test('Renders Root component',  async () => {
    const { container }=  await act( async () => render(<App/>));
    expect(container.firstChild).toHaveClass('App');

});

describe('Render Stocks Available', () => {
    it('should render stock static UI', async () => {
        const { container }=  render(<InfoContainer/>);
        expect(container.firstChild).toHaveClass('title');
        // expect(screen.getByText('US Stock Exchange'));
        // expect(screen.getByText('You can select at most 3 stock for  detail pricing'));
    
    });
});