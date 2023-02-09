import React from 'react';
import {createSlice} from '@reduxjs/toolkit';

const plansSlice = createSlice({
  name: 'settings',
  initialState: {
    stateTypes: [],
  },
  reducers: {
    setStateTypes(state, action) {
      state.stateTypes = [...action.payload.stateTypes];
    },
  },
});

export const {setStateTypes} = plansSlice.actions;
export default plansSlice.reducer;
