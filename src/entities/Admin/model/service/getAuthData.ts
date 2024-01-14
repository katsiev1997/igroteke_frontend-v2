import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from 'src/shared/api';
import { LOCAL_STORAGE_TOKEN } from 'src/shared/consts/localStorage';
import { setAuthData } from '../slice/adminSlice';
import { adminType } from '../types/admin';

export interface getAuthDataType {
  admin: adminType;
  message: string;
  token: string;
}
export const getAuthData = createAsyncThunk(
  'admin/getAuthData',
  async (_, thunkApi) => {
    try {
      const res = await $api.get<getAuthDataType>('/refresh_token');
      if (res.data) {
        thunkApi.dispatch(setAuthData(res.data.admin));
        localStorage.setItem(LOCAL_STORAGE_TOKEN, res.data.token);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
