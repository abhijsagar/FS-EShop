import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
};

export const eventReducer = createReducer(initialState, {
    getAlleventsShopRequest: (state) => {
        state.isLoading = true;
    },
    getAlleventsShopSuccess: (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
    },
    getAlleventsShopFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
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
