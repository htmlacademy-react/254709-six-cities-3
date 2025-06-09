import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { LoginType, UserData } from '../../types/user';
import { getToken, saveToken, dropToken } from '../../services/token';
import { Endpoint } from '../../const';

export const checkAuthStatus = createAsyncThunk<UserData, undefined, { extra: AxiosInstance }>(
  'user/checkStatus',
  async (_arg, { extra: api }) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error('No token found');
      }

      const response = await api.get<UserData>(Endpoint.Login);
      return { ...response.data, token };
    } catch (error) {
      dropToken();
      throw new Error('Auth check failed');
    }
  }
);

export const loginUser = createAsyncThunk<UserData, LoginType, { extra: AxiosInstance }>(
  'user/login',
  async ({ email, password }, { extra: api }) => {
    try {
      const response = await api.post<UserData>(Endpoint.Login, { email, password });

      saveToken(response.data.token);

      return response.data;
    } catch (error) {
      throw new Error('Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk<void, undefined, { extra: AxiosInstance }>(
  'user/logout',
  async (_arg, { extra: api }) => {
    try {
      await api.delete(Endpoint.Logout);
      dropToken();
    } catch (error) {
      throw new Error('Logout failed');
    }
  }
);
