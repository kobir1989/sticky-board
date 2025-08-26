import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { MAX_ZOOM, MIN_ZOOM } from '@/constants';
import type { NoteTypes } from '@/types';

interface InitialState {
  scale: number;
  x: number;
  y: number;
  isShowSettingsPanel: boolean;
  notes: NoteTypes[];
}

const initialState: InitialState = {
  scale: 1,
  isShowSettingsPanel: false,
  notes: [],
  x: 0,
  y: 0
};

export const noteSlice = createSlice({
  name: 'noteSlice',
  initialState,
  reducers: {
    toggleSettingsPanel: (state) => {
      state.isShowSettingsPanel = !state.isShowSettingsPanel;
    },
    handleZoom: (state, action: PayloadAction<number>) => {
      const zoom = action.payload;
      state.scale = state.scale = Math.min(Math.max(zoom, MIN_ZOOM), MAX_ZOOM);
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
