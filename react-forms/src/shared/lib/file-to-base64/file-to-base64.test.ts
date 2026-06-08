import { describe, expect, it, vi, beforeEach } from "vitest";

import { fileToBase64 } from ".";

describe("fileToBase64", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("resolves base64 string when file is read successfully", async () => {
    const mockResult = "data:image/png;base64,test";

    class MockFileReader {
      result: string | ArrayBuffer | null = mockResult;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;

      readAsDataURL() {
        this.onload?.();
      }
    }

    vi.stubGlobal("FileReader", MockFileReader);

    const file = new File(["test"], "test.png", {
      type: "image/png",
    });

    await expect(fileToBase64(file)).resolves.toBe(mockResult);
  });

  it("rejects when file reading fails", async () => {
    class MockFileReader {
      result: string | ArrayBuffer | null = null;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;

      readAsDataURL() {
        this.onerror?.();
      }
    }

    vi.stubGlobal("FileReader", MockFileReader);

    const file = new File(["test"], "test.png", {
      type: "image/png",
    });

    await expect(fileToBase64(file)).rejects.toThrow(
      "Failed to read file",
    );
  });
});