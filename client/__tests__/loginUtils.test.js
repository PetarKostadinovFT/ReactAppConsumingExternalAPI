import { handleLogin } from "../src/utils/loginUtils";
import axios from "axios";
import { toast } from "react-hot-toast";

jest.mock("axios");
jest.mock("react-hot-toast", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe("handleLogin Function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("successfully logs in a user", async () => {
    const userData = {
      email: "test@example.com",
      password: "password",
    };

    const responseMock = {
      data: { success: true },
    };

    axios.post.mockResolvedValueOnce(responseMock);

    const setIsAuthenticatedMock = jest.fn();
    const navigateMock = jest.fn();

    await handleLogin(userData, setIsAuthenticatedMock, navigateMock);

    expect(axios.post).toHaveBeenCalledWith("/api/users/login", {
      email: "test@example.com",
      password: "password",
    });
    expect(toast.success).toHaveBeenCalledWith("Login Successful. Welcome!");
    expect(setIsAuthenticatedMock).toHaveBeenCalledWith(true);
    expect(navigateMock).toHaveBeenCalledWith("/home");
  });

  it("displays an error message when login fails", async () => {
    const userData = {
      email: "test@example.com",
      password: "password",
    };

    const responseMock = {
      data: { error: "Login failed" },
    };

    axios.post.mockResolvedValueOnce(responseMock);

    const setIsAuthenticatedMock = jest.fn();
    const navigateMock = jest.fn();

    await handleLogin(userData, setIsAuthenticatedMock, navigateMock);

    expect(axios.post).toHaveBeenCalledWith("/api/users/login", {
      email: "test@example.com",
      password: "password",
    });
    expect(toast.error).toHaveBeenCalledWith("Login failed");
    expect(setIsAuthenticatedMock).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });
  it("displays an error", async () => {
    const userData = {
      email: "",
      password: "password",
    };

    const responseMock = {
      data: { error: "All fields are required!" },
    };

    axios.post.mockResolvedValueOnce(responseMock);

    const setIsAuthenticatedMock = jest.fn();
    const navigateMock = jest.fn();

    await handleLogin(userData, setIsAuthenticatedMock, navigateMock);

    expect(axios.post).toHaveBeenCalledWith("/api/users/login", {
      email: "",
      password: "password",
    });
    expect(toast.error).toHaveBeenCalledWith("All fields are required!");
    expect(setIsAuthenticatedMock).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("displays a generic error message for unexpected errors", async () => {
    const userData = {
      email: "test@example.com",
      password: "password",
    };

    axios.post.mockRejectedValueOnce("An unexpected error occurred");
    const consoleLogSpy = jest.spyOn(console, "log");
    const setIsAuthenticatedMock = jest.fn();
    const navigateMock = jest.fn();

    await handleLogin(userData, setIsAuthenticatedMock, navigateMock);

    expect(axios.post).toHaveBeenCalledWith("/api/users/login", {
      email: "test@example.com",
      password: "password",
    });
    expect(consoleLogSpy).toHaveBeenCalledWith("An unexpected error occurred");
    expect(setIsAuthenticatedMock).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });
});
