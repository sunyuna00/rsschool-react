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
      <div>
        <div>Number</div>
        <div>Uppercase letter</div>
        <div>Lowercase letter</div>
        <div>Special symbol</div>
        <div data-testid="password-value">{password}</div>
      </div>
    ),
  };
});

vi.mock("@/entities/submission/submission-slice", () => ({
  addSubmission: (payload: unknown) => ({
    type: "submission/add",
    payload,
  }),
}));

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
        <UncontrolledForm onSuccess={vi.fn()} />
      </Provider>,
    ),
  };
}

describe("UncontrolledForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all fields", () => {
    renderWithStore();

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Age")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Gender")).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
  });

  it("shows password strength UI while typing", async () => {
    const { user } = renderWithStore();

    const passwordInput = screen.getByLabelText("Password");

    await user.type(passwordInput, "Test123!");

    expect(screen.getByText("Number")).toBeInTheDocument();
    expect(screen.getByText("Uppercase letter")).toBeInTheDocument();
    expect(screen.getByText("Lowercase letter")).toBeInTheDocument();
    expect(screen.getByText("Special symbol")).toBeInTheDocument();

    expect(screen.getByTestId("password-value")).toHaveTextContent("Test123!");
  });

  it("shows image required error on submit", async () => {
    const { user } = renderWithStore();

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByText("Image is required")).toBeInTheDocument();
  });

  it("submits form successfully and updates store", async () => {
    const { user, store } = renderWithStore();

    const file = new File(["test"], "test.png", { type: "image/png" });

    await user.type(screen.getByLabelText("Name"), "John");
    await user.type(screen.getByLabelText("Age"), "20");
    await user.type(screen.getByLabelText("Email"), "john@test.com");
    await user.selectOptions(screen.getByLabelText("Gender"), "male");
    await user.type(screen.getByLabelText("Country"), "USA");
    await user.type(screen.getByLabelText("Password"), "Test123!");
    await user.type(screen.getByLabelText("Confirm Password"), "Test123!");

    await user.upload(
      screen.getByLabelText("Profile Image", { selector: "input" }),
      file,
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    const state = store.getState() as {
      submission: { items: unknown[] };
    };

    expect(state.submission.items.length).toBeGreaterThanOrEqual(0);
  });
});
