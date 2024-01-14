import { createSlice } from '@reduxjs/toolkit';
import { adminLogin } from '../service/adminLogin';
import { adminSignup } from '../service/adminSignup';
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
    builder.addCase(adminSignup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(adminSignup.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(adminSignup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(adminLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(adminLogin.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(adminLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const auth = authSlice.reducer;
