import submissionReducer, { addSubmission } from "./submission-slice";

describe("submission slice", () => {
  test("should handle addSubmission", () => {
    const initialState = { items: [] };

    const newState = submissionReducer(
      initialState,
      addSubmission({
        id: "1",
        name: "Test",
        age: 20,
        email: "test@mail.com",
        gender: "male",
        country: "USA",
        image: "img",
        createdAt: Date.now()
      })
    );

    expect(newState.items.length).toBe(1);
  });
});