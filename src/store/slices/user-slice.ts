import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import type { UserStateType, AuthorizationStatusType } from '../../types/user';
import { checkAuthStatus, loginUser, logoutUser } from '../thunk/auth-thunk';

const initialState: UserStateType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  email: null,
  token: null,
  error: null,
};

const clearAuth = (state: UserStateType, authorizationStatus: AuthorizationStatusType) => {
  state.authorizationStatus = authorizationStatus;
  state.email = null;
  state.token = null;
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        clearAuth(state, AuthorizationStatus.NoAuth);
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        clearAuth(state, AuthorizationStatus.NoAuth);
        state.error = action.error.message || 'Login failed';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        clearAuth(state, AuthorizationStatus.NoAuth);
        state.error = null;
      });
  },
});

export default userSlice.reducer;
