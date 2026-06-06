import { configureStore } from "@reduxjs/toolkit";
import countrySlice from "@/entities/country/country-slice";
import submissionSlice from "@/entities/submission/submission-slice";

export const store = configureStore({
  reducer: {
    submission: submissionSlice,
    countries: countrySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
