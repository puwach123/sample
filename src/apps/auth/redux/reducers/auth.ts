import { createSlice } from "@reduxjs/toolkit";

import { login, logout, register } from "../actions/auth";

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const user = localStorage.getItem("user");

interface Initialstate {
  status: "IDLE" | "PENDING" | "SUCCESS" | "FAIL";
  token: string;
  authed: boolean;
  user: { id: number; name: string; password: string } | undefined;
  role: string;
  error: string | undefined;
}

const initialState: Initialstate = {
  status: "IDLE",
  token: token || "",
  authed: Boolean(token),
  user: user ? JSON.parse(user) : undefined,
  role: role || "",
  error: "" as string | undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    idle: (state) => {
      state.status = "IDLE";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.status = "PENDING";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.authed = true;
      state.error = "";
      state.role = action.payload.role;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "FAIL";
      state.authed = false;
      state.error = action.error.message;
    });
    builder.addCase(logout.pending, (state, action) => {
      state.status = "PENDING";
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.authed = false;
      state.error = "";
      state.role = "";
      state.user = undefined;
      state.token = "";
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.status = "FAIL";
      state.error = action.error.message;
    });
    builder.addCase(register.pending, (state, action) => {
      state.status = "PENDING";
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.status = "SUCCESS";
    });
    builder.addCase(register.rejected, (state, action) => {
      state.status = "FAIL";
      state.error = action.error.message;
    });
  },
});

export const { idle } = authSlice.actions;

export default authSlice;
