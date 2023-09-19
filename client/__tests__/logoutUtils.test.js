import axios from "axios";
import { logout } from "../src/utils/logoutUtils";

jest.mock("axios");

describe("logout", () => {
  let consoleErrorSpy;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it("should logout successfully", async () => {
    const setIsAuthenticatedMock = jest.fn();
    axios.get.mockResolvedValueOnce();

    const result = await logout(setIsAuthenticatedMock);
    expect(setIsAuthenticatedMock).toHaveBeenCalledWith(false);
    expect(result).toBe(true);
  });

  it("should handle logout failure", async () => {
    const setIsAuthenticatedMock = jest.fn();
    axios.get.mockRejectedValueOnce(new Error("Logout failed"));
    const result = await logout(setIsAuthenticatedMock);
    expect(setIsAuthenticatedMock).not.toHaveBeenCalled();

    expect(result).toBe(false);
  });
});
