import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) =>
      state.theme === "dark" ? state.theme === "light" : state.theme === "dark",
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
