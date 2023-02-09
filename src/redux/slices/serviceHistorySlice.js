import React from 'react';
import {createSlice} from '@reduxjs/toolkit';

const serviceHistorySlice = createSlice({
  name: 'serviceHistory',
  initialState: {
    //data
    selectedHistoryTypesNotSaved: [],
    selectedHistoryTypesSaved: [],
  },
  reducers: {
    //is needed when user open filter screen
    setHistoryDefaultTypesNotSaved(state, action) {
      state.selectedHistoryTypesNotSaved = [...state.selectedHistoryTypesSaved];
    },
    //is needed if user select type or certain transaction
    setHistorySelectedTypesNotSaved(state, action) {
      const id = action.payload.id;
      const isSelected = state.selectedHistoryTypesNotSaved.some(
        type => type.id === id,
      );
      if (!isSelected) {
        state.selectedHistoryTypesNotSaved.push(action.payload);
      }
    },
    deleteHistorySelectedTypesNotSaved(state, action) {
      const id = action.payload.id;
      const arr = state.selectedHistoryTypesNotSaved.filter(type => {
        if (type.id !== id) {
          return type;
        }
      });
      state.selectedHistoryTypesNotSaved = [...arr];
    },
    //reset all what user selected, if didn't push 'Done' button
    resetHistorySelectedTypesNotSaved(state, action) {
      const arr = [];
      state.selectedHistoryTypesNotSaved = [...arr];
    },
    //save all what user checked
    saveHistorySelectedTypes(state, action) {
      state.selectedHistoryTypesSaved = [...state.selectedHistoryTypesNotSaved];
    },
  },
});

export const {
  setHistoryDefaultTypesNotSaved,
  setHistorySelectedTypesNotSaved,
  deleteHistorySelectedTypesNotSaved,
  resetHistorySelectedTypesNotSaved,
  saveHistorySelectedTypes,
} = serviceHistorySlice.actions;
export default serviceHistorySlice.reducer;
