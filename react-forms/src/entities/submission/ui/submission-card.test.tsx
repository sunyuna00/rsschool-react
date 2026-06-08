import { render, screen } from "@testing-library/react";
import { SubmissionCard } from "./submission-card";

describe("SubmissionCard", () => {
  const submission = {
    id: "1",
    name: "Fatima",
    email: "fatima@gmail.com",
    age: 20,
    gender: "female",
    country: "Kyrgyzstan",
    image: "test-image",
    createdAt: Date.now(),
  };

  test("renders submission data", () => {
    render(<SubmissionCard submission={submission} />);

    expect(
      screen.getByRole("heading", {
        name: "Fatima",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Email: fatima@gmail.com"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Age: 20"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Gender: female"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Country: Kyrgyzstan"),
    ).toBeInTheDocument();
  });

  test("renders image", () => {
    render(<SubmissionCard submission={submission} />);

    expect(
      screen.getByRole("img", {
        name: "Fatima",
      }),
    ).toHaveAttribute(
      "src",
      "test-image",
    );
  });

  test("highlights new submission", () => {
    const { container } = render(
      <SubmissionCard
        submission={submission}
        isNew
      />,
    );

    expect(
      container.firstChild,
    ).toHaveClass(
      "border-green-500",
    );
  });
});