import { createAsyncThunk } from '@reduxjs/toolkit';
import { customerData } from 'src/features/auth/model/types/customer';
import { $api } from 'src/shared/api';
import { LOCAL_STORAGE_TOKEN } from 'src/shared/consts/localStorage';
import { setAuthData } from '../slice/customerSlice';

export interface getAuthDataType {
  customer: customerData;
  message: string;
  token: string;
}
export const getAuthData = createAsyncThunk(
  'customer/getAuthData',
  async (_, thunkApi ) => {
    try {
      const res = await $api.get<getAuthDataType>('/refresh_token');
      if (res.data) {
        thunkApi.dispatch(setAuthData(res.data.customer));
        localStorage.setItem(LOCAL_STORAGE_TOKEN, res.data.token);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
