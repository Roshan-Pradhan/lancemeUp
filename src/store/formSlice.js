import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "formData",
  initialState: {},
  reducers: {
    saveData(state, action) {
      return action.payload;
    },
  },
});

export const { saveData } = formSlice.actions;

export default formSlice.reducer;
