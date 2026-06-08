import submissionReducer, { addSubmission } from "./submission-slice";
import type { Submission } from "./model/types";

const mockSubmission: Submission = {
  id: "1",
  name: "John",
  age: 20,
  email: "john@test.com",
  gender: "male",
  country: "USA",
  image: "img",
  createdAt: 123,
};

describe("submissionSlice", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return initial state", () => {
    const state = submissionReducer(undefined, { type: "init" });

    expect(state.items).toEqual([]);
  });

  it("should add submission to list", () => {
    const state = submissionReducer(undefined, addSubmission(mockSubmission));

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(mockSubmission);
  });

  it("should add to beginning of list", () => {
    const first = { ...mockSubmission, id: "1" };
    const second = { ...mockSubmission, id: "2" };

    let state = submissionReducer(undefined, addSubmission(first));
    state = submissionReducer(state, addSubmission(second));

    expect(state.items[0]?.id).toBe("2");
  });

  it("should persist to localStorage", () => {
    submissionReducer(undefined, addSubmission(mockSubmission));

    const stored = JSON.parse(localStorage.getItem("submissions") || "[]");

    expect(stored).toHaveLength(1);
    expect(stored[0]).toEqual(mockSubmission);
  });
});