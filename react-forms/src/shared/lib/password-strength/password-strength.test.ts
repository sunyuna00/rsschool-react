import { describe, expect, it } from "vitest";

import { getPasswordStrength } from ".";

describe("getPasswordStrength", () => {
  it("returns all false for empty password", () => {
    expect(getPasswordStrength("")).toEqual({
      hasNumber: false,
      hasUppercase: false,
      hasLowercase: false,
      hasSpecial: false,
    });
  });

  it("detects numbers", () => {
    expect(getPasswordStrength("abc123")).toEqual({
      hasNumber: true,
      hasUppercase: false,
      hasLowercase: true,
      hasSpecial: false,
    });
  });

  it("detects uppercase letters", () => {
    expect(getPasswordStrength("ABC")).toEqual({
      hasNumber: false,
      hasUppercase: true,
      hasLowercase: false,
      hasSpecial: false,
    });
  });

  it("detects lowercase letters", () => {
    expect(getPasswordStrength("abc")).toEqual({
      hasNumber: false,
      hasUppercase: false,
      hasLowercase: true,
      hasSpecial: false,
    });
  });

  it("detects special characters", () => {
    expect(getPasswordStrength("abc!")).toEqual({
      hasNumber: false,
      hasUppercase: false,
      hasLowercase: true,
      hasSpecial: true,
    });
  });

  it("detects all password requirements", () => {
    expect(getPasswordStrength("Test123!")).toEqual({
      hasNumber: true,
      hasUppercase: true,
      hasLowercase: true,
      hasSpecial: true,
    });
  });
});
