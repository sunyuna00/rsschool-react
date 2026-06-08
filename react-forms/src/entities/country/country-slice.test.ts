import countryReducer from "./country-slice";

describe("countrySlice", () => {
  test("should return initial state", () => {
    expect(
      countryReducer(undefined, {
        type: "",
      }),
    ).toEqual({
      items: expect.any(Array),
    });
  });

  test("should contain countries", () => {
    const state = countryReducer(
      undefined,
      {
        type: "",
      },
    );

    expect(state.items.length)
      .toBeGreaterThan(0);
  });
});