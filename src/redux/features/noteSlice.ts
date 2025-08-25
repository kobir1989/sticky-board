import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { NoteTypes } from '@/types';

interface InitialState {
  zoomLabel: number;
  isShowSettingsPanel: boolean;
  notes: NoteTypes[];
}

const initialState: InitialState = { zoomLabel: 1, isShowSettingsPanel: false, notes: [] };

export const noteSlice = createSlice({
  name: 'noteSlice',
  initialState,
  reducers: {
    toggleSettingsPanel: (state) => {
      state.isShowSettingsPanel = !state.isShowSettingsPanel;
    },
    handleZoom: (state, action: PayloadAction<number>) => {
      state.zoomLabel = action.payload;
    },
    addNewNote: (state, action: PayloadAction<NoteTypes>) => {
      state.notes = [...state.notes, action.payload];
    },
    removeNote: (state, action: PayloadAction<string>) => {
      const updatedNotes = state.notes.filter((note) => note.id !== action.payload);
      state.notes = updatedNotes;
    },
    updateNotes: (state, action: PayloadAction<NoteTypes>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    }
  }
});

export const { toggleSettingsPanel, handleZoom, addNewNote, removeNote, updateNotes } =
  noteSlice.actions;

export default noteSlice.reducer;
