import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from 'src/shared/api';
import { LOCAL_STORAGE_TOKEN } from 'src/shared/consts/localStorage';
import { setAuthData } from 'src/entities/Admin/model/slice/adminSlice';
import { getAuthDataType } from 'src/entities/Admin/model/service/getAuthData';
import { adminData } from '../types/auth';

export const adminLogin = createAsyncThunk(
  'admin/login',
  async (data: adminData, thunkApi) => {
    try {
      const res = await $api.post<getAuthDataType>('/login', data);
      if (res.data) {
        console.log(res.data.message);
        localStorage.setItem(LOCAL_STORAGE_TOKEN, res.data.token);
        thunkApi.dispatch(setAuthData(res.data.admin));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
