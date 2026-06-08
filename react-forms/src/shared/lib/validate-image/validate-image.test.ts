import { describe, expect, it } from "vitest";

import { validateImage } from "../validate-image";

describe("validateImage", () => {
  it("returns null for valid png image", () => {
    const file = new File(["test"], "image.png", {
      type: "image/png",
    });

    expect(validateImage(file)).toBeNull();
  });

  it("returns null for valid jpeg image", () => {
    const file = new File(["test"], "image.jpg", {
      type: "image/jpeg",
    });

    expect(validateImage(file)).toBeNull();
  });

  it("returns error for unsupported file type", () => {
    const file = new File(["test"], "image.gif", {
      type: "image/gif",
    });

    expect(validateImage(file)).toBe("Only PNG and JPEG allowed");
  });

  it("returns error when file size exceeds 2MB", () => {
    const file = new File(
      [new Uint8Array(2 * 1024 * 1024 + 1)],
      "large.png",
      {
        type: "image/png",
      },
    );

    expect(validateImage(file)).toBe("Max image size is 2MB");
  });

  it("returns null for file exactly 2MB", () => {
    const file = new File(
      [new Uint8Array(2 * 1024 * 1024)],
      "image.png",
      {
        type: "image/png",
      },
    );

    expect(validateImage(file)).toBeNull();
  });
});