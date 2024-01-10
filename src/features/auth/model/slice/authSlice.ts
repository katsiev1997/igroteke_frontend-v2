import { createSlice } from '@reduxjs/toolkit';
import { customerLogin } from '../service/customerLogin';
import { customerSignup } from '../service/customerSignup';
import { AuthState } from '../types/auth';

const initialState: AuthState = {
  loading: false,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(customerSignup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(customerSignup.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(customerSignup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(customerLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(customerLogin.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(customerLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const auth = authSlice.reducer;
