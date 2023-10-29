import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.user = null;
    },
    updateAuth: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, updateAuth } = authSlice.actions;
export default authSlice.reducer;
