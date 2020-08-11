import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const authedSelector = createSelector(
  (state: RootState) => state.auth.authed,
  (authed) => authed
);

export const errSelector = createSelector(
  (state: RootState) => state.auth.error,
  (error) => error
);

export const statusSelector = createSelector(
  (state: RootState) => state.auth.status,
  (status) => status
);
