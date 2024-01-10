import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { clubType, ClubSliceState, StatusClub } from './types';
import { $api } from 'src/shared/api';

const initialState: ClubSliceState = {
  clubs: [],
  status: StatusClub.LOADING,
};

export const fetchClubs = createAsyncThunk<clubType[]>(
  'clubs/fetchClubsStatus',
  async () => {
    const { data } = await $api.get<clubType[]>('/clubs');
    return data;
  }
);

const clubSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    setClubs: (state, action) => {
      state.clubs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClubs.pending, (state) => {
      state.status = StatusClub.LOADING;
      state.clubs = [];
    });
    builder.addCase(
      fetchClubs.fulfilled,
      (state, action: PayloadAction<clubType[]>) => {
        state.status = StatusClub.SUCCESS;
        state.clubs = action.payload;
      }
    );
    builder.addCase(fetchClubs.rejected, (state) => {
      state.status = StatusClub.ERROR;
      state.clubs = [];
    });
  },
});

export const { setClubs } = clubSlice.actions;

export const club = clubSlice.reducer;
