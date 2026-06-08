import { configureStore } from "@reduxjs/toolkit";
import countrySlice from "@/entities/country/country-slice";
import submissionSlice, { hydrate } from "@/entities/submission/submission-slice";
import type { Submission } from "@/entities/submission/model/types";

const loadSubmissions = (): Submission[] => {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem("submissions") || "[]");
  } catch {
    return [];
  }
};

export const store = configureStore({
  reducer: {
    submission: submissionSlice,
    countries: countrySlice,
  },
});

store.dispatch(hydrate(loadSubmissions()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
