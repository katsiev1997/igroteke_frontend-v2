import { createSlice } from '@reduxjs/toolkit';
import { ReserveType } from '../types/ReserveType';

const initialState: ReserveType = {
  club: 0,
  room: 0,
  from: null,
  to: null,
};

const reserveSlice = createSlice({
  name: 'reserve',
  initialState,
  reducers: {
    setClub: (state, action) => {
      state.club = action.payload
    },
    setRoom: (state, action) => {
      state.room = action.payload
    },
    setTimeReserve: (state, action) => {
      if (action.payload === 100) {
        state.from = null;
        state.to = null;
      } else if (state.from === null) {
        state.from = action.payload;
      } else if (action.payload < state.from) {
        // alert('Сначала выберите на какое время бронировать, а затем конец брони');
        state.from = null;
      } else if (state.to === null) {
        state.to = action.payload;
      } else {
        state.to = null;
        state.from = null;
      }
    },
  },
});

export const { setTimeReserve, setClub, setRoom } = reserveSlice.actions;

export const reserve = reserveSlice.reducer;
