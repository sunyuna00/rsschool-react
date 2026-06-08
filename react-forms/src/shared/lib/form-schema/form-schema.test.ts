import { describe, expect, it } from "vitest";
import { formSchema } from "../form-schema";

describe("formSchema", () => {
  it("should validate correct data", () => {
    const result = formSchema.safeParse({
      name: "Fatima",
      age: 20,
      email: "fatima@gmail.com",
      gender: "female",
      country: "Kyrgyzstan",
      password: "Password123!",
      confirmPassword: "Password123!",
      image: undefined,
      terms: true,
    });

    expect(result.success).toBe(true);
  });

  it("should reject lowercase first letter", () => {
    const result = formSchema.safeParse({
      name: "fatima",
      age: 20,
      email: "fatima@gmail.com",
      gender: "female",
      country: "Kyrgyzstan",
      password: "Password123!",
      confirmPassword: "Password123!",
      image: undefined,
      terms: true,
    });

    expect(result.success).toBe(false);
  });

  it("should reject negative age", () => {
    const result = formSchema.safeParse({
      name: "Fatima",
      age: -1,
      email: "fatima@gmail.com",
      gender: "female",
      country: "Kyrgyzstan",
      password: "Password123!",
      confirmPassword: "Password123!",
      image: undefined,
      terms: true,
    });

    expect(result.success).toBe(false);
  });

  it("should reject invalid email", () => {
    const result = formSchema.safeParse({
      name: "Fatima",
      age: 20,
      email: "fatimagmail.com",
      gender: "female",
      country: "Kyrgyzstan",
      password: "Password123!",
      confirmPassword: "Password123!",
      image: undefined,
      terms: true,
    });

    expect(result.success).toBe(false);
  });

  it("should reject different passwords", () => {
    const result = formSchema.safeParse({
      name: "Fatima",
      age: 20,
      email: "fatima@gmail.com",
      gender: "female",
      country: "Kyrgyzstan",
      password: "Password123!",
      confirmPassword: "AnotherPassword123!",
      image: undefined,
      terms: true,
    });

    expect(result.success).toBe(false);
  });

  it("should reject unchecked terms", () => {
    const result = formSchema.safeParse({
      name: "Fatima",
      age: 20,
      email: "fatima@gmail.com",
      gender: "female",
      country: "Kyrgyzstan",
      password: "Password123!",
      confirmPassword: "Password123!",
      image: undefined,
      terms: false,
    });

    expect(result.success).toBe(false);
  });
});