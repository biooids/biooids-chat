import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      console.log("Theme toggled"); // Add this line to verify

      state.theme = state.theme === "dark" ? "light" : "dark"; // Correct toggling
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
