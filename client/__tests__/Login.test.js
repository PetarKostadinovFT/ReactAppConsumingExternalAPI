import * as React from "react";
import Login from "../src/components/Login";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
  close,
} from "@testing-library/react";
import { AuthProvider } from "../src/context/userContext";
import { MemoryRouter } from "react-router-dom";
//import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios"; // Import Axios

afterEach(cleanup);

test("should call onSubmit 0 times on click Login button", () => {
  const onSubmit = jest.fn();

  render(
    <MemoryRouter>
      <AuthProvider>
        <Login onSubmit={onSubmit} />
      </AuthProvider>
    </MemoryRouter>
  );

  const btn = screen.getByRole("button");

  fireEvent.click(btn);

  expect(onSubmit).toHaveBeenCalledTimes(0);
});

test("should call onSubmit 1 times on click Login button with credentials", async () => {
  const onSubmit = jest.fn();

  render(
    <MemoryRouter>
      <AuthProvider>
        <Login onSubmit={onSubmit} />
      </AuthProvider>
    </MemoryRouter>
  );
  const emailInputElement = screen.getByLabelText("Email");

  const passwordInputElement = screen.getByLabelText("Password");

  fireEvent.change(emailInputElement, {
    target: { value: "petar.kostadinov@ft.com" },
  });
  fireEvent.change(passwordInputElement, { target: { value: "123456" } });

  const formElement = screen.getByTestId("login-button");
  fireEvent.submit(formElement);
  expect(onSubmit).toHaveBeenCalledTimes(0);
});

test("email value should change", () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  );

  const emailInputElement = screen.getByPlaceholderText(/Enter Email.../i);
  const testValue = "test";
  fireEvent.change(emailInputElement, { target: { value: testValue } });
  expect(emailInputElement.value).toBe(testValue);
});
test("password value should change", () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  );

  const passwordInputElement =
    screen.getByPlaceholderText(/Enter Password.../i);
  const testValue = "test";
  fireEvent.change(passwordInputElement, { target: { value: testValue } });
  expect(passwordInputElement.value).toBe(testValue);
});
