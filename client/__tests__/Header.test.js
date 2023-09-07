import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import Header from "../src/components/Header";
import { AuthProvider } from "../src/context/userContext";
import "@testing-library/jest-dom";
import { expect, test } from "@jest/globals";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Login from "../src/components/Login";
import Home from "../src/components/Home";
import Register from "../src/components/Register";

afterEach(cleanup);

test("Go to login", async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText("Login"));

  await screen.findAllByPlaceholderText("Enter Email...");
});

test("Go to register", async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText("Register"));

  await screen.findAllByPlaceholderText("Enter Email...");
});

test("Go to home", async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/home" element={<Home />} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText("Home"));

  await screen.findByText("Latest News");
});

test("Go to home from Logo", async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/home" element={<Home />} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText("NewsHub"));

  await screen.findByText("FREE Register to read all news with details");
});
