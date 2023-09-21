import { toast } from "react-hot-toast";
import { handleRegister } from "../src/utils/registerUtils";
import axios from "axios";

jest.mock("axios");
jest.mock("react-hot-toast", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe("handleRegister Function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("successfully registers a user", async () => {
    const userData = {
      email: "test@example.com",
      password: "password",
      repass: "password",
    };

    const responseMock = {
      status: 200,
      data: { success: true },
    };

    axios.post.mockResolvedValueOnce(responseMock);

    const setIsAuthenticatedMock = jest.fn();
    const navigateMock = jest.fn();

    await handleRegister(userData, setIsAuthenticatedMock, navigateMock);

    expect(axios.post).toHaveBeenCalledWith("/api/users/register", {
      email: "test@example.com",
      password: "password",
    });
    expect(toast.success).toHaveBeenCalledWith("Register Successful. Welcome!");
    expect(setIsAuthenticatedMock).toHaveBeenCalledWith(true);
    expect(navigateMock).toHaveBeenCalledWith("/home");
  });

  it("displays an error message when passwords don't match", async () => {
    const userData = {
      email: "test@example.com",
      password: "password",
      repass: "differentpassword",
    };

    const setIsAuthenticatedMock = jest.fn();
    const navigateMock = jest.fn();

    await handleRegister(userData, setIsAuthenticatedMock, navigateMock);

    expect(axios.post).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Passwords don't match!");
    expect(setIsAuthenticatedMock).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("displays an error message when email is already taken", async () => {
    const userData = {
      email: "test@example.com",
      password: "password",
      repass: "password",
    };

    const responseMock = {
      status: 400,
      data: { error: "Email is taken already!" },
    };

    axios.post.mockResolvedValueOnce(responseMock);

    const setIsAuthenticatedMock = jest.fn();
    const navigateMock = jest.fn();

    await handleRegister(userData, setIsAuthenticatedMock, navigateMock);

    expect(axios.post).toHaveBeenCalledWith("/api/users/register", {
      email: "test@example.com",
      password: "password",
    });
    expect(toast.error).toHaveBeenCalledWith("Email is taken already!");
    expect(setIsAuthenticatedMock).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("displays an error message for server error", async () => {
    const userData = {
      email: "test@example.com",
      password: "password",
      repass: "password",
    };

    axios.post.mockRejectedValueOnce("Server error");

    const setIsAuthenticatedMock = jest.fn();
    const navigateMock = jest.fn();

    const consoleLogSpy = jest.spyOn(console, "log");
    consoleLogSpy.mockImplementation(() => {});

    await handleRegister(userData, setIsAuthenticatedMock, navigateMock);

    expect(axios.post).toHaveBeenCalledWith("/api/users/register", {
      email: "test@example.com",
      password: "password",
    });

    expect(consoleLogSpy).toHaveBeenCalledWith("Server error");

    expect(setIsAuthenticatedMock).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();

    consoleLogSpy.mockRestore();
  });
});
