import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PasswordStrength } from "./password-strength";

describe("PasswordStrength", () => {
  it("should render all requirements", () => {
    render(<PasswordStrength password="" />);

    expect(screen.getByText("Number")).toBeInTheDocument();
    expect(screen.getByText("Uppercase letter")).toBeInTheDocument();
    expect(screen.getByText("Lowercase letter")).toBeInTheDocument();
    expect(screen.getByText("Special symbol")).toBeInTheDocument();
  });

  it("should show satisfied requirements for strong password", () => {
    render(<PasswordStrength password="Password123!" />);

    expect(screen.getByText("Number")).toBeInTheDocument();
    expect(screen.getByText("Uppercase letter")).toBeInTheDocument();
    expect(screen.getByText("Lowercase letter")).toBeInTheDocument();
    expect(screen.getByText("Special symbol")).toBeInTheDocument();
  });
});
