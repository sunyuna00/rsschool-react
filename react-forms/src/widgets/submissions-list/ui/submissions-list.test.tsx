import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SubmissionsList } from "./submissions-list";

vi.mock("@/shared", () => ({
  useAppSelector: vi.fn(),
}));

vi.mock("@/entities/submission", () => ({
  SubmissionCard: ({
    submission,
  }: {
    submission: { name: string };
  }) => <div>{submission.name}</div>,
}));

import { useAppSelector } from "@/shared";

describe("SubmissionsList", () => {
  it("should show empty state", () => {
    vi.mocked(useAppSelector).mockReturnValue([]);

    render(<SubmissionsList />);

    expect(
      screen.getByText("No submissions yet"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Start by filling out one of the forms above/i,
      ),
    ).toBeInTheDocument();
  });

  it("should render submissions", () => {
    vi.mocked(useAppSelector).mockReturnValue([
      {
        id: "1",
        name: "Fatima",
      },
      {
        id: "2",
        name: "John",
      },
    ]);

    render(<SubmissionsList />);

    expect(
      screen.getByText("Submissions"),
    ).toBeInTheDocument();

    expect(screen.getByText("Fatima")).toBeInTheDocument();

    expect(screen.getByText("John")).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument();
  });
});