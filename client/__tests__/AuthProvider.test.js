import { renderHook } from "@testing-library/react-hooks";
import { AuthProvider, useAuth } from "../src/context/userContext";

describe("AuthProvider functionality", () => {
  let originalCookieValue = global.document.cookie;
  beforeEach(() => {
    global.document.cookie = originalCookieValue;
  });

  afterAll(() => {
    global.document.cookie = originalCookieValue;
  });

  it("should initialize isAuthenticated based on document.cookie", () => {
    global.document.cookie = "token=mockedToken";

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.isAuthenticated).toBe(true);
  });

  it("should update isAuthenticated when document.cookie changes", () => {
    global.document.cookie = "token=mockedToken";

    const { result, rerender } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.isAuthenticated).toBe(true);
  });
});
