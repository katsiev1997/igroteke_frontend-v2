import { createSlice } from '@reduxjs/toolkit';
import { getAuthData } from '../service/getAuthData';
import { AdminSliceState } from '../types/admin';
import { adminLogout } from '../service/adminLogout'

const initialState: AdminSliceState = {
  admin: null,
  loading: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      console.log(action.payload);
      state.admin = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAuthData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAuthData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getAuthData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(adminLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminLogout.fulfilled, (state) => {
        state.loading = false;
        state.admin = null;
      })
      .addCase(adminLogout.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const setAuthData = adminSlice.actions.setAuthData;
export const admin = adminSlice.reducer;
