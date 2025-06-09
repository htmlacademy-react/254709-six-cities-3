import type { RootState } from '../types/store';
import { createSelector } from '@reduxjs/toolkit';

const selectUserState = (state: RootState) => state.user;

export const userSelectors = {
  selectAuthStatus: createSelector(
    [selectUserState],
    (user) => user.authorizationStatus
  ),
  selectEmail: createSelector(
    [selectUserState],
    (user) => user.email
  ),
};
