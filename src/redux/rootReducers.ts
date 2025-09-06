import { combineReducers } from '@reduxjs/toolkit';
import noteSlice from '@/redux/features/noteSlice';

export const rootReducer = combineReducers({
  noteSlice
});
