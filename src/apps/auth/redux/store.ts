import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reduxLogger from "redux-logger";

import authSlice from "./reducers/auth";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const rootStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootDispatch = typeof rootStore.dispatch;

export default rootStore;
