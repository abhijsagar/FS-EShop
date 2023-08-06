import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
};

export const productReducer = createReducer(initialState, {
    getAllProductsShopRequest: (state) => {
        state.isLoading = true;
    },
    getAllProductsShopSuccess: (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
    },
    getAllProductsShopFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
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
