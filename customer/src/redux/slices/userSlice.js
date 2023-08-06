import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { server } from '../../server';
import axios from 'axios';

export const loadUserAsync = createAsyncThunk('user/loadUser', async () => {
    try {
        const response = await axios.get(`${server}/user/getuser`, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        return console.log(err);
    }
});

export const updateUserInformationAsync = createAsyncThunk('user/updateUserInformation', async (name, email, phoneNumber, password) => {
    try {
        const response = await axios.put(
            `${server}/user/update-user-info`,
            {
                email,
                password,
                phoneNumber,
                name,
            },
            {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Credentials': true,
                },
            }
        );
        return response.data;
    } catch (err) {
        return console.log(err);
    }
});

export const updatUserAddressAsync = createAsyncThunk('user/updatUserAddress', async (country, city, address1, address2, zipCode, addressType) => {
    try {
        const response = await axios.put(
            `${server}/user/update-user-addresses`,
            {
                country,
                city,
                address1,
                address2,
                zipCode,
                addressType,
            },
            { withCredentials: true }
        );
        return response.data;
    } catch (err) {
        return console.log(err);
    }
});

export const deleteUserAddressAsync = createAsyncThunk('user/deleteUserAddress', async (id) => {
    try {
        const response = await axios.delete(`${server}/user/delete-user-address/${id}`, { withCredentials: true });
        return response.data;
    } catch (err) {
        return console.log(err);
    }
});

const initialState = {
    successMessage: false,
    usersLoading: false,
    addressloading: false,
    loading: false,
    error: null,
    user: {},
    users: [],
    isAuthenticated: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadUser: (state, payload) => {
            state.user = payload?.user;
            state.loading = false;
            state.isAuthenticated = payload ? true : false;
        },
        updateUserInformation: (state, payload) => {
            state.user = payload?.user;
            state.loading = false;
        },
        updatUserAddress: (state, payload) => {
            state.user = payload?.user;
            state.loading = false;
            state.isAuthenticated = payload ? true : false;
        },
        deleteUserAddress: (state, payload) => {
            state.user = payload?.user;
            state.addressloading = false;
            state.successMessage = payload.successMessage;
        },
    },
    extraReducers: {
        [loadUserAsync.pending.type]: (state) => {
            state.loading = true;
        },
        [loadUserAsync.fulfilled.type]: (state, { payload }) => {
            state.user = payload?.user;
            state.loading = false;
            state.isAuthenticated = payload ? true : false;
        },
        [loadUserAsync.rejected.type]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.isAuthenticated = payload ? true : false;
        },
        [updateUserInformationAsync.pending.type]: (state) => {
            state.loading = true;
        },
        [updateUserInformationAsync.fulfilled.type]: (state, { payload }) => {
            state.user = payload?.user;
            state.loading = false;
        },
        [updateUserInformationAsync.rejected.type]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [updatUserAddressAsync.pending.type]: (state) => {
            state.addressloading = true;
        },
        [updatUserAddressAsync.fulfilled.type]: (state, { payload }) => {
            state.user = payload?.user;
            state.addressloading = false;
            state.successMessage = payload.successMessage;
        },
        [updatUserAddressAsync.rejected.type]: (state, { payload }) => {
            state.addressloading = false;
            state.error = payload;
        },
        [deleteUserAddressAsync.pending.type]: (state) => {
            state.addressloading = true;
        },
        [deleteUserAddressAsync.fulfilled.type]: (state, { payload }) => {
            state.user = payload?.user;
            state.addressloading = false;
            state.successMessage = payload.successMessage;
        },
        [deleteUserAddressAsync.rejected.type]: (state, { payload }) => {
            state.addressloading = false;
            state.error = payload;
        },
    },
});

export const { loadUser, updateUserInformation, updatUserAddress, deleteUserAddress } = userSlice.actions;

export default userSlice.reducer;
