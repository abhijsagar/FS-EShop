import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
    LoadUserRequest: (state) => {
        state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
    },
    LoadUserFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    getAllUsersRequest: (state) => {
        state.usersLoading = true;
    },
    getAllUsersSuccess: (state, action) => {
        state.usersLoading = false;
        state.users = action.payload;
    },
    getAllUsersFailed: (state, action) => {
        state.usersLoading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
    clearMessages: (state) => {
        state.successMessage = null;
    },
});
