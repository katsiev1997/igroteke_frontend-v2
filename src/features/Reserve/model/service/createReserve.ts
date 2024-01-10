import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchClubs } from 'src/entities/Club';
import { getAuthData } from 'src/entities/Customer';
import { $api } from 'src/shared/api';
import { setTimeReserve } from '../..';

export const customerLogin = createAsyncThunk(
  'customer/login',
  async (data, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    try {
      const res = await $api.post('/create_reserve', data);
      if (res.data) {
        console.log(res.data.message);
        dispatch(getAuthData());
        dispatch(fetchClubs());
        dispatch(setTimeReserve(100));
        return res.data.message
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
