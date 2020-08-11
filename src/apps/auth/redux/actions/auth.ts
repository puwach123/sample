import { createAsyncThunk } from "@reduxjs/toolkit";

import authService from "../../services/auth";

interface LoginPayload {
  username: string;
  password: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: LoginPayload, thunkAPI) => {
    try {
      const response = await authService.login(username, password);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

interface RegisterPayload {
  username: string;
  password: string;
}

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, password }: RegisterPayload, thunkAPI) => {
    try {
      await authService.register(username, password);
    } catch (error) {
      throw error;
    }
  }
);

interface LogoutPayload {}

export const logout = createAsyncThunk(
  "auth/logout",
  async (username: string, thunkAPI) => {
    try {
      await authService.logout();
    } catch (error) {
      throw error;
    }
  }
);
