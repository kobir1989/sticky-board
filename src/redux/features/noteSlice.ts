import { createSlice } from '@reduxjs/toolkit';

const initialState = { note: [] };

export const noteSlice = createSlice({
  name: 'noteSlice',
  initialState,
  reducers: {}
});

export default noteSlice.reducer;
