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
    addSubmission: (state, action: PayloadAction<Submission>) => {
      state.items.unshift(action.payload);
    },
  },
});

export const { addSubmission } = submissionSlice.actions;

export default submissionSlice.reducer;
