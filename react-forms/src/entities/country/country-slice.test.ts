import countryReducer from "./country-slice";

describe("countrySlice", () => {
  it("should return initial state", () => {
    const state = countryReducer(undefined, { type: "unknown" });

    expect(state).toBeDefined();
    expect(Array.isArray(state.items)).toBe(true);
  });

  it("should contain predefined countries", () => {
    const state = countryReducer(undefined, { type: "unknown" });

    expect(state.items.length).toBeGreaterThan(0);
    expect(state.items).toContain("USA");
    expect(state.items).toContain("Germany");
  });

  it("should ignore unknown actions and return same state shape", () => {
    const prevState = countryReducer(undefined, { type: "unknown" });

    const nextState = countryReducer(prevState, { type: "SOME_RANDOM_ACTION" });

    expect(nextState).toEqual(prevState);
  });
});