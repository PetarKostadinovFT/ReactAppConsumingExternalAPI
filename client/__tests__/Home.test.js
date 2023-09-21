import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import Home from "../src/components/Home";
import { AuthProvider } from "../src/context/userContext";
import "@testing-library/jest-dom";
import useArticleFetch from "../src/utils/useArticleFetch";

afterEach(cleanup);

describe("Home Component", () => {
  test("renders an error message when there are no articles", async () => {
    // Mock the useArticleFetch module
    jest.mock("../src/utils/useArticleFetch", () => ({
      __esModule: true,
      default: () => ({
        allArticles: [],
        error: "Error loading news. Please try again later.",
        isLoading: false,
        searchQuery: "",
        handleSearchChange: jest.fn(),
        fetchArticles: jest.fn(),
      }),
    }));

    render(
      <AuthProvider>
        <Home />
      </AuthProvider>
    );

    expect(
      screen.getByText("Error loading news. Please try again later.")
    ).toBeInTheDocument();
  });
});
