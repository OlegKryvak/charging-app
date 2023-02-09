import React from 'react';
import {createSlice} from '@reduxjs/toolkit';

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    //data
    organisationId: null,
    selectedTypesNotSaved: [],
    selectedTypesSaved: [],

    selectedTransactionsNotSaved: [],
    selectedTransactionsSaved: [],
  },
  reducers: {
    setOrganisationId(state, action) {
      state.organisationId = action.payload.organisationId;
    },
    //is needed when user open filter screen
    setDefaultUsersNotSaved(state, action) {
      state.selectedTransactionsNotSaved = [...state.selectedTransactionsSaved];
    },
    setDefaultTypesNotSaved(state, action) {
      state.selectedTypesNotSaved = [...state.selectedTypesSaved];
    },
    //is needed if user select type or certain transaction
    setSelectedUsersNotSaved(state, action) {
      const id = action.payload.id;
      const isSelected = state.selectedTransactionsNotSaved.some(
        transaction => transaction.id === id,
      );
      if (!isSelected) {
        state.selectedTransactionsNotSaved.push(action.payload);
      }
    },
    setSelectedTypesNotSaved(state, action) {
      const id = action.payload.id;
      const isSelected = state.selectedTypesNotSaved.some(
        type => type.id === id,
      );
      if (!isSelected) {
        state.selectedTypesNotSaved.push(action.payload);
      }
    },
    //is needed if user unselect type or certain transaction
    deleteSelectedUsersNotSaved(state, action) {
      const id = action.payload.id;
      const arr = state.selectedTransactionsNotSaved.filter(transaction => {
        if (transaction.id !== id) {
          return transaction;
        }
      });
      state.selectedTransactionsNotSaved = [...arr];
    },
    deleteSelectedTypesNotSaved(state, action) {
      const id = action.payload.id;
      const arr = state.selectedTypesNotSaved.filter(type => {
        if (type.id !== id) {
          return type;
        }
      });
      state.selectedTypesNotSaved = [...arr];
    },
    //reset all what user selected, if didn't push 'Done' button
    resetSelectedUsersNotSaved(state, action) {
      const arr = [];
      state.selectedTransactionsNotSaved = [...arr];
    },
    resetSelectedTypesNotSaved(state, action) {
      const arr = [];
      state.selectedTypesNotSaved = [...arr];
    },
    //save all what user checked
    saveSelectedUsers(state, action) {
      state.selectedTransactionsSaved = [...state.selectedTransactionsNotSaved];
    },
    saveSelectedTypes(state, action) {
      state.selectedTypesSaved = [...state.selectedTypesNotSaved];
    },
  },
});

export const {
  setOrganisationId,
  setDefaultUsersNotSaved,
  setDefaultTypesNotSaved,
  setSelectedUsersNotSaved,
  setSelectedTypesNotSaved,
  deleteSelectedUsersNotSaved,
  deleteSelectedTypesNotSaved,
  resetSelectedUsersNotSaved,
  resetSelectedTypesNotSaved,
  saveSelectedUsers,
  saveSelectedTypes,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
