import { renderHook, act } from "@testing-library/react-hooks";
import { useArticleFetch } from "../src/utils/useArticleFetch";

jest.mock("../src/utils/fetchArticles", () => ({
  fetchArticles: jest.fn(),
}));

describe("useArticleFetch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch articles and update state on successful fetch", async () => {
    const mockedArticles = ["Article 1", "Article 2"];
    const fetchArticlesMock = jest.fn().mockResolvedValue(mockedArticles);

    require("../src/utils/fetchArticles").fetchArticles = fetchArticlesMock;

    let result;
    await act(async () => {
      const { result: hookResult } = renderHook(() => useArticleFetch());
      result = hookResult;
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.handleSearchChange({ target: { value: "searchQuery" } });
    });

    await act(async () => {
      await result.current.fetchArticles();
    });

    expect(fetchArticlesMock).toHaveBeenCalledWith("searchQuery");
    expect(result.current.allArticles).toEqual(mockedArticles);
    expect(result.current.error).toBe(null);
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle an error when fetching articles", async () => {
    const errorMessage = "Error loading news. Please try again later.";
    const fetchArticlesMock = jest
      .fn()
      .mockRejectedValue(new Error(errorMessage));

    require("../src/utils/fetchArticles").fetchArticles = fetchArticlesMock;

    let result;
    await act(async () => {
      const { result: hookResult } = renderHook(() => useArticleFetch());
      result = hookResult;
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.handleSearchChange({ target: { value: "searchQuery" } });
    });

    await act(async () => {
      await result.current.fetchArticles();
    });

    expect(fetchArticlesMock).toHaveBeenCalledWith("searchQuery");
    expect(result.current.allArticles).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.isLoading).toBe(false);
  });

  it("should set an initial empty state", async () => {
    let result;
    await act(async () => {
      const { result: hookResult } = renderHook(() => useArticleFetch());
      result = hookResult;
    });

    expect(result.current.allArticles).toEqual([]);
    expect(result.current.error).toBe(null);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.searchQuery).toBe("");
  });

  it("should update the searchQuery state when handleSearchChange is called", () => {
    let result;
    act(() => {
      const { result: hookResult } = renderHook(() => useArticleFetch());
      result = hookResult;
    });

    const searchQuery = "newSearchQuery";
    act(() => {
      result.current.handleSearchChange({ target: { value: searchQuery } });
    });

    expect(result.current.searchQuery).toBe(searchQuery);
  });

  it("should handle null fetchedArticles response", async () => {
    const fetchArticlesMock = jest.fn().mockResolvedValue(null);

    require("../src/utils/fetchArticles").fetchArticles = fetchArticlesMock;

    let result;
    await act(async () => {
      const { result: hookResult } = renderHook(() => useArticleFetch());
      result = hookResult;
    });

    act(() => {
      result.current.handleSearchChange({ target: { value: "searchQuery" } });
    });

    await act(async () => {
      await result.current.fetchArticles();
    });

    expect(result.current.allArticles).toEqual([]);
    expect(result.current.error).toBe("No articles found.");
    expect(result.current.isLoading).toBe(false);
  });
});
