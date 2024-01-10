import { createSlice } from '@reduxjs/toolkit';
import { getAuthData } from '../service/getAuthData';
import { CustomerSliceState } from '../types/customer';
import { customerLogout } from '../service/customerLogout'

const initialState: CustomerSliceState = {
  customer: null,
  loading: false,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      console.log(action.payload);
      state.customer = action.payload;
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
      .addCase(customerLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(customerLogout.fulfilled, (state) => {
        state.loading = false;
        state.customer = null;
      })
      .addCase(customerLogout.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const setAuthData = customerSlice.actions.setAuthData;
export const customer = customerSlice.reducer;
