import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from 'src/shared/api';
import { adminData } from '../types/auth';

export const adminSignup = createAsyncThunk(
  'auth/signup',
  async (userData: adminData, thunkApi) => {
    try {
      const res = await $api.post(
        '/signup',
        userData
      );
      return res
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
