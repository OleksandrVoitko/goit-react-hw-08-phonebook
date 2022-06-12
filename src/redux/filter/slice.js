import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    addFilter(state, action) {
      if (state) {
        state = '';
        return state + action.payload;
      }
      return state + action.payload;
    },
  },
});

export const { addFilter } = filterSlice.actions;
