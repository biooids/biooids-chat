import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../app/features/theme/themeSlice.js";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});
