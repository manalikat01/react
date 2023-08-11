/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable no-restricted-globals */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable jest/valid-expect */
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";

import { test } from "@jest/globals";
import App from "./App";
// import { InfoContainer, Stocks, ViewSelectedStock } from './components';
import {
  mockRequestForCandel,
  mockRequestWithData,
  mockStockDetails,
} from "./utils";
import { StockContext } from "./context";
import StockChart from "./components/StockChart";
import userEvent from "@testing-library/user-event";
import React from "react";
import { InfoContainer, LandingPage, ViewSelectedStock } from "./components";
import { DateInput, SearchContainer } from "./components/InputComponents";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

test("Renders Root component", async () => {
  render(<App />);
});

test("Renders landing page", async () => {
  const { container } = render(<LandingPage />);
  expect(container.firstChild).toHaveClass("App");
  expect(container.getElementsByClassName("header").length).toBe(1);
});

test("should render stock information UI", async () => {
  const { container } = render(<InfoContainer />);
  expect(container.firstChild).toHaveClass("title");
  expect(screen.getByText("US Stock Exchange"));
});

test("Renders search Container and perform events", async () => {
  const { container, getByTestId } = await act(async () =>
    render(<SearchContainer isSubmitClicked={false}/>)
  );
  expect(container.getElementsByClassName("search-filter").length).toBe(1);
  const autocomplete = getByTestId("autocomplete-input");
  const input = within(autocomplete).getByRole("combobox");
  autocomplete.focus();
  fireEvent.change(input, { target: { value: "a" } });
  fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
  fireEvent.keyDown(autocomplete, { key: "Enter" });
});

describe("Render Selected Stocks Card Container", () => {
  test("should render no data block", async () => {
    const { container } = await act(async () => render(<ViewSelectedStock />));
    expect(container.firstChild).toHaveClass("card-view");
    // expect(screen.getByText("No stock selected yet!"));
  });
  test("should render data block", async () => {
    const { container } = await act(async () =>
      render(
        <StockContext.Provider
          value={{
            selectedStocks: mockStockDetails,
            setSelectedStocks: () => {},
          }}
        >
          <ViewSelectedStock />
        </StockContext.Provider>
      )
    );

    expect(container.firstChild).toHaveClass("card-view");
    expect(screen.getByText("GIGM"));
    expect(screen.getByText("USD"));
    expect(screen.getByText("BBG000BQGYG0"));
    expect(screen.getByText("GIGAMEDIA LTD"));
  });
});

describe("Render Chart Container", () => {
  test("should render chart block", async () => {
    const { container } = render(<StockChart filter={mockRequestWithData} isSubmitClicked={false} handleResetChart={function (isSubmitClicked: boolean): void {
      throw new Error("Function not implemented.");
    } } />);
    expect(container.firstChild).toHaveClass("no-chart-container");
    expect(screen.getByText("Chart data not available!"));
  });

  test("should render no chart block", async () => {
    const { container } = render(<StockChart filter={mockRequestForCandel} isSubmitClicked={true} handleResetChart={function (isSubmitClicked: boolean): void {
      throw new Error("Function not implemented.");
    } } />);
    expect(container.firstChild).toHaveClass("no-chart-container");
    expect(screen.getByText("Chart data not available!"));
  });
});
