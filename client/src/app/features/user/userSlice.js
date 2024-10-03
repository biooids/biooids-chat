import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    actionStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    actionSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    actionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actionStart, actionSuccess, actionFailure } = userSlice.actions;

export default userSlice.reducer;
