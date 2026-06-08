import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Submission } from "./model/types";

type State = {
  items: Submission[];
};

const initialState: State = {
  items: [],
};

const submissionSlice = createSlice({
  name: "submission",
  initialState,
  reducers: {
    hydrate: (state, action: PayloadAction<Submission[]>) => {
      state.items = action.payload;
    },

    addSubmission: (state, action: PayloadAction<Submission>) => {
      state.items.unshift(action.payload);
      localStorage.setItem("submissions", JSON.stringify(state.items));
    },
  },
});

export const { addSubmission, hydrate } = submissionSlice.actions;
export default submissionSlice.reducer;