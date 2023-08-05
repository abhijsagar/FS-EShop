import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
};

export const eventReducer = createReducer(initialState, {
    getAlleventsRequest: (state) => {
        state.isLoading = true;
    },
    getAlleventsSuccess: (state, action) => {
        state.isLoading = false;
        state.allEvents = action.payload;
    },
    getAlleventsFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    },
});
