import Register from "../src/components/Register";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { AuthProvider } from "../src/context/userContext";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "@jest/globals";

afterEach(cleanup);

test("should call onSubmit 0 times on click Register button", () => {
  const onSubmit = jest.fn();

  render(
    <MemoryRouter>
      <AuthProvider>
        <Register onSubmit={onSubmit} />
      </AuthProvider>
    </MemoryRouter>
  );

  const btn = screen.getByRole("button");

  fireEvent.click(btn);

  expect(onSubmit).toHaveBeenCalledTimes(0);
});

test("should call onSubmit 1 times on click Register button with credentials", async () => {
  const onSubmit = jest.fn();

  render(
    <MemoryRouter>
      <AuthProvider>
        <Register onSubmit={onSubmit} />
      </AuthProvider>
    </MemoryRouter>
  );
  const emailInputElement = screen.getByLabelText("Email");
  const passwordInputElement = screen.getByLabelText("Password");
  const repassInputElement = screen.getByLabelText("Confirm Password");

  fireEvent.change(emailInputElement, {
    target: { value: "petar.kostadinov@ft.com" },
  });
  fireEvent.change(passwordInputElement, { target: { value: "123456" } });
  fireEvent.change(repassInputElement, { target: { value: "123456" } });

  const formElement = screen.getByTestId("register-button");
  fireEvent.submit(formElement);
  expect(onSubmit).toHaveBeenCalledTimes(0);
});

test("email value should change", () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Register />
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
        <Register />
      </AuthProvider>
    </MemoryRouter>
  );

  const passwordInputElement =
    screen.getByPlaceholderText(/Enter Password.../i);
  const testValue = "test";
  fireEvent.change(passwordInputElement, { target: { value: testValue } });
  expect(passwordInputElement.value).toBe(testValue);
});
