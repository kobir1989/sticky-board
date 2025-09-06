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
    handleZoom: (state, { payload }: PayloadAction<number>) => {
      const zoom = payload;
      state.scale = state.scale = Math.min(Math.max(zoom, MIN_ZOOM), MAX_ZOOM);
    },
    addNewNote: (state, { payload }: PayloadAction<NoteTypes>) => {
      state.notes = [...state.notes, payload];
    },
    removeNote: (state, { payload }: PayloadAction<string>) => {
      const updatedNotes = state.notes.filter((note) => note.id !== payload);
      state.notes = updatedNotes;
    },
    updateNotes: (state, { payload }: PayloadAction<NoteTypes>) => {
      const index = state.notes.findIndex((note) => note.id === payload.id);
      if (index !== -1) {
        state.notes[index] = payload;
      }
    },
    setDefaultColor: (state, { payload }: PayloadAction<ColorType>) => {
      state.defaultNoteColor = payload;
    },
    toggleMiniMap: (state, { payload }: PayloadAction<boolean>) => {
      state.isShowMiniMap = payload;
    },
    toggleInfiniteGrid: (state, { payload }: PayloadAction<boolean>) => {
      state.isShowGrid = payload;
    },
    updateBoardCord: (state, { payload }: PayloadAction<PositionTypes>) => {
      state.x = payload.x;
      state.y = payload.y;
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
    navigateBoardFromMiniMap: (state, { payload }: PayloadAction<PositionTypes>) => {
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
