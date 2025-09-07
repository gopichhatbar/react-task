import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import UserList from "./UserList";
import { server } from "../mocks/server";
import { beforeAll, afterAll, afterEach, test, expect } from "vitest"; // if using vitest

// Start MSW server for API mocking
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders Add User form", async () => {
  render(
    <Provider store={store}>
      <UserList />
    </Provider>
  );

  // wait for the element to appear in the DOM
  const addUserHeading = await screen.findByText(/Add User/i, {}, { timeout: 2000 });
  expect(addUserHeading).toBeInTheDocument();
});

test("renders search input", async () => {
  render(
    <Provider store={store}>
      <UserList />
    </Provider>
  );

  const searchInput = await screen.findByPlaceholderText(/Search by name or email.../i, {}, { timeout: 2000 });
  expect(searchInput).toBeInTheDocument();
});

test("can type in Name input", async () => {
  render(
    <Provider store={store}>
      <UserList />
    </Provider>
  );

  const nameInput = await screen.findByPlaceholderText("Name", {}, { timeout: 2000 });
  fireEvent.change(nameInput, { target: { value: "John Doe" } });
  expect(nameInput.value).toBe("John Doe");
});
