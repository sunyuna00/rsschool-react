import { createSlice } from "@reduxjs/toolkit";
import { countries } from "./model/countries";

const countrySlice = createSlice({
  name: "countries",
  initialState: {
    items: countries,
  },
  reducers: {},
});

export default countrySlice.reducer;
