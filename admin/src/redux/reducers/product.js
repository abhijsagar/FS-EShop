import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
};

export const productReducer = createReducer(initialState, {
    getAllProductsRequest: (state) => {
        state.isLoading = true;
    },
    getAllProductsSuccess: (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload;
    },
    getAllProductsFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    },
});
