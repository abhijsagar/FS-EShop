import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
};

export const sellerReducer = createReducer(initialState, {
    getAllSellersRequest: (state) => {
        state.isLoading = true;
    },
    getAllSellersSuccess: (state, action) => {
        state.isLoading = false;
        state.sellers = action.payload;
    },
    getAllSellerFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
});
