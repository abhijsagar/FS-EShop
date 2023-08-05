import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
};

export const orderReducer = createReducer(initialState, {
    adminAllOrdersRequest: (state) => {
        state.adminOrderLoading = true;
    },
    adminAllOrdersSuccess: (state, action) => {
        state.adminOrderLoading = false;
        state.adminOrders = action.payload;
    },
    adminAllOrdersFailed: (state, action) => {
        state.adminOrderLoading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    },
});
