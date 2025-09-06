import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_COLOR, MAX_ZOOM, MIN_ZOOM } from '@/constants';
import type { ColorType, NoteTypes, PositionTypes, UpdateNoteAction } from '@/types';

interface InitialState {
  scale: number;
  x: number;
  y: number;
  defaultNoteColor: ColorType;
  isShowSettingsPanel: boolean;
  notes: NoteTypes[];
  isShowMiniMap: boolean;
  isShowGrid: boolean;
}

const initialState: InitialState = {
  scale: 1,
  isShowSettingsPanel: false,
  defaultNoteColor: DEFAULT_COLOR,
  notes: [],
  x: 0,
  y: 0,
  isShowMiniMap: true,
  isShowGrid: true
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
    },
    setDefaultColor: (state, action: PayloadAction<ColorType>) => {
      state.defaultNoteColor = action.payload;
    },
    toggleMiniMap: (state, action: PayloadAction<boolean>) => {
      state.isShowMiniMap = action.payload;
    },
    toggleInfiniteGrid: (state, action: PayloadAction<boolean>) => {
      state.isShowGrid = action.payload;
    },
    updateBoardCord: (state, action: PayloadAction<PositionTypes>) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
    },
    updateNoteCord: (state, { payload }: PayloadAction<UpdateNoteAction>) => {
      const findNoteIndex = state.notes.findIndex((note) => note.id === payload.id);

      if (findNoteIndex !== -1) {
        state.notes[findNoteIndex] = {
          ...state.notes[findNoteIndex],
          position: {
            x: payload.x,
            y: payload.y
          }
        };
      }
    },
    navigateBoardFromMiniMap: (state, { payload }: PayloadAction<{ x: number; y: number }>) => {
      state.x = payload.x;
      state.y = payload.y;
    },
    resetSettings: (state) => {
      state.defaultNoteColor = DEFAULT_COLOR;
      state.isShowGrid = true;
      state.isShowMiniMap = true;
      state.scale = 1;
    }
  }
});

export const {
  toggleSettingsPanel,
  handleZoom,
  addNewNote,
  removeNote,
  updateNotes,
  setDefaultColor,
  toggleInfiniteGrid,
  toggleMiniMap,
  resetSettings,
  updateBoardCord,
  updateNoteCord,
  navigateBoardFromMiniMap
} = noteSlice.actions;

export default noteSlice.reducer;
