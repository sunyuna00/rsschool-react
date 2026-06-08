import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "../header";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";

describe("Header", () => {
  test("renders dashboard title", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    expect(
      screen.getByText("React Forms Dashboard"),
    ).toBeInTheDocument();
  });

  test("renders both buttons", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    expect(
      screen.getByRole("button", {
        name: /uncontrolled form/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /react hook form/i,
      }),
    ).toBeInTheDocument();
  });

  test("opens uncontrolled form modal", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    await user.click(
      screen.getByRole("button", {
        name: /uncontrolled form/i,
      }),
    );

    expect(
      screen.getByText("Uncontrolled Form"),
    ).toBeInTheDocument();
  });

  test("opens react hook form modal", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    await user.click(
      screen.getByRole("button", {
        name: /react hook form/i,
      }),
    );

    expect(
      screen.getByText("React Hook Form"),
    ).toBeInTheDocument();
  });
});