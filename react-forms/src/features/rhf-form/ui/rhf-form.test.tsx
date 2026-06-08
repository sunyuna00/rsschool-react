import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import submissionReducer from "@/entities/submission/submission-slice";
import { RHFForm } from "./rhf-form";

vi.mock("@/shared", async () => {
  const actual = await vi.importActual("@/shared");

  return {
    ...actual,
    fileToBase64: vi.fn(() => Promise.resolve("base64-image")),
    validateImage: vi.fn(() => null),
    PasswordStrength: () => <div>PasswordStrength</div>,
  };
});

const renderWithStore = () => {
  const store = configureStore({
    reducer: {
      submissions: submissionReducer,
      countries: () => ({
        items: ["USA", "Germany"],
      }),
    },
  });

  return render(
    <Provider store={store}>
      <RHFForm />
    </Provider>,
  );
};

describe("RHFForm", () => {
  test("renders all fields", () => {
    renderWithStore();

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Age")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Gender")).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByText(/click to upload image/i)).toBeInTheDocument();
  });

  test("submit button is disabled initially", () => {
    renderWithStore();

    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  });

  test("allows typing in inputs", () => {
    renderWithStore();

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John" },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@mail.com" },
    });

    expect((screen.getByLabelText(/name/i) as HTMLInputElement).value).toBe(
      "John",
    );
  });

  test("selects country from input", () => {
    renderWithStore();

    const countryInput = screen.getByLabelText(/country/i);

    fireEvent.change(countryInput, {
      target: { value: "USA" },
    });

    expect((countryInput as HTMLInputElement).value).toBe("USA");
  });
});
