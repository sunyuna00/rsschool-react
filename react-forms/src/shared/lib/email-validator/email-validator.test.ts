import { describe, expect, it } from "vitest";

import { validateEmail } from "../email-validator";

describe("validateEmail", () => {
  it("returns true for valid email", () => {
    expect(validateEmail("test@example.com")).toBe(true);
  });

  it("trims whitespace before validation", () => {
    expect(validateEmail("  test@example.com  ")).toBe(true);
  });

  it("returns false when email does not contain @", () => {
    expect(validateEmail("testexample.com")).toBe(false);
  });

  it("returns false when email contains multiple @ symbols", () => {
    expect(validateEmail("test@@example.com")).toBe(false);
  });

  it("returns false when local part is missing", () => {
    expect(validateEmail("@example.com")).toBe(false);
  });

  it("returns false when domain is missing", () => {
    expect(validateEmail("test@")).toBe(false);
  });

  it("returns false when domain does not contain dot", () => {
    expect(validateEmail("test@example")).toBe(false);
  });

  it("returns true for subdomain emails", () => {
    expect(validateEmail("test@mail.example.com")).toBe(true);
  });
});