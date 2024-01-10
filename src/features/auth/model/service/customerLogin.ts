import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from 'src/shared/api';
import { LOCAL_STORAGE_TOKEN } from 'src/shared/consts/localStorage';
import { customerData } from '../types/customer';
import { setAuthData } from 'src/entities/Customer/model/slice/customerSlice';
import { getAuthDataType } from 'src/entities/Customer/model/service/getAuthData';

export const customerLogin = createAsyncThunk(
  'customer/login',
  async (data: customerData, thunkApi) => {
    try {
      const res = await $api.post<getAuthDataType>('/login', data);
      if (res.data) {
        console.log(res.data.message);
        localStorage.setItem(LOCAL_STORAGE_TOKEN, res.data.token);
        thunkApi.dispatch(setAuthData(res.data.customer));
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
