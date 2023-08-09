/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable jest/valid-expect */
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { ChartFilterComponent } from "../components/FilterChart";

describe('Render Chart Filters', () => {
    test('should render all inputs', async () => {
        const { container } = await act(async () => render(<ChartFilterComponent updateFilter={(filter) => { }} />));
        expect(container.firstChild).toHaveClass('filters');
        expect(screen.getByText('Resolution'));
        expect(screen.getByText('W'))
        expect(screen.getByDisplayValue("01/01/1970")).toBeInTheDocument();

        // Select Button with Submit Text
        await waitFor(() => {
            const submitBtn = screen.getByText('Submit')
            userEvent.click(submitBtn);
        });
    });
})