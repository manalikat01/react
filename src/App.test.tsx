/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable jest/valid-expect */
import { act, render } from '@testing-library/react';
import { test } from '@jest/globals';
import App from './App';

test('Renders Root component',  async () => {
    const { container }=  await act( async () => render(<App/>));
    expect(container.firstChild).toHaveClass('App');

});

