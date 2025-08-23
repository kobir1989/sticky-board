import { createSlice } from '@reduxjs/toolkit';

const initialState = { isShowSettingsPanel: false, note: [] };

export const noteSlice = createSlice({
  name: 'noteSlice',
  initialState,
  reducers: {
    toggleSettingsPanel: (state) => {
      state.isShowSettingsPanel = !state.isShowSettingsPanel;
    }
  }
});

export const { toggleSettingsPanel } = noteSlice.actions;

export default noteSlice.reducer;
