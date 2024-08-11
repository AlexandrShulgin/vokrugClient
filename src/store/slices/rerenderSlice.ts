import { createSlice } from '@reduxjs/toolkit';

const initialState: boolean = false;

const rerenderSlice = createSlice({
  name: 'rerender',
  initialState,
  reducers: {
    setRerender: (state) => {
      return !state;
    },
  },
});

export const { setRerender } = rerenderSlice.actions;

export default rerenderSlice.reducer;