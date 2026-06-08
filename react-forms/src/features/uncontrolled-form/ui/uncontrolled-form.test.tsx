import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { UncontrolledForm } from "./uncontrolled-form";

vi.mock("@/shared", async () => {
  const actual = await vi.importActual<typeof import("@/shared")>("@/shared");

  return {
    ...actual,
    fileToBase64: vi.fn(() => Promise.resolve("base64-image")),
    validateImage: vi.fn(() => ""),
    PasswordStrength: ({ password }: { password: string }) => (
      <div data-testid="password-strength">{password}</div>
    ),
  };
});

function renderWithStore() {
  const store = configureStore({
    reducer: {
      countries: () => ({
        items: ["USA", "Germany"],
      }),
      submission: (state = { items: [] }) => state,
    },
  });

  return {
    store,
    user: userEvent.setup(),
    ...render(
      <Provider store={store}>
        <UncontrolledForm />
      </Provider>
    ),
  };
}

describe("UncontrolledForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form fields", () => {
    renderWithStore();

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Age")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Gender")).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
  });

  it("shows password strength", async () => {
    const { user } = renderWithStore();

    await user.type(screen.getByLabelText("Password"), "Test123!");

    expect(screen.getByTestId("password-strength")).toHaveTextContent(
      "Test123!"
    );
  });

  it("shows image required error when submitting empty image", async () => {
    const { user } = renderWithStore();

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByText("Image is required")).toBeInTheDocument();
  });
});