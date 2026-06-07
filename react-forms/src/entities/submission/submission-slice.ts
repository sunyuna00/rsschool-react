import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Submission = {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  image?: string;
  createdAt: number;
};

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
