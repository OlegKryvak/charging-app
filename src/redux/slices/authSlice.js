import React from 'react';
import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'settings',
  initialState: {
    user: {
      email: '',
      password: '',
      token: '',
      userOrgId: null,
    },
  },
  reducers: {
    setUser(state, action) {
      state.user.email = action.payload;
    },
    setToken(state, action) {
      state.user.token = action.payload;
    },
    setUserOrgId(state, action) {
      state.user.userOrgId = action.payload.id;
    },
  },
});

export const {setUser, setToken, setUserOrgId} = authSlice.actions;
export default authSlice.reducer;
