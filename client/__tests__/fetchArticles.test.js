import axios from "axios";
import Cookies from "js-cookie";
import MockAdapter from "axios-mock-adapter";
import { fetchArticles } from "../src/utils/fetchArticles";

const mock = new MockAdapter(axios);

jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));

describe("fetchArticles", () => {
  beforeEach(() => {
    mock.reset();
    Cookies.get.mockClear();
  });

  it("should fetch articles successfully", async () => {
    const searchQuery = "example";

    Cookies.get.mockReturnValue("mockedToken");

    mock
      .onGet("/api/articles/home", {
        params: { q: searchQuery },
        headers: {
          Authorization: "Bearer mockedToken",
        },
      })
      .reply(200, { data: "mockedArticles" });

    const result = await fetchArticles(searchQuery);

    expect(result).toEqual({ data: "mockedArticles" });
  });

  it("should handle an error when fetching articles", async () => {
    const searchQuery = "example";

    Cookies.get.mockReturnValue("mockedToken");

    mock
      .onGet("/api/articles/home")
      .reply(500, { error: "Internal Server Error" });

    try {
      await fetchArticles(searchQuery);

      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Request failed with status code 500");
    }
  });

  it("should throw an error if no token is found", async () => {
    const searchQuery = "example";

    Cookies.get.mockReturnValue(null);

    try {
      await fetchArticles(searchQuery);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Request failed with status code 404");
    }
  });
});
