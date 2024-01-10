import { createAsyncThunk } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_TOKEN } from 'src/shared/consts/localStorage';
import { $api } from 'src/shared/api';

export const customerLogout = createAsyncThunk(
  'customer/logout',
  async (_, thunkApi) => {
    try {
      const res = await $api.post('/logout');
      if (res.data) {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        window.location.href = '/';
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
