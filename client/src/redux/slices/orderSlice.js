import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { server } from '../../server';
import axios from 'axios';

export const getAllOrdersOfUserAsync = createAsyncThunk('order/getAllOrdersOfUser', async (userId) => {
    try {
        const response = await axios.get(`${server}/order/get-all-orders/${userId}`);
        return response.data;
    } catch (err) {
        return console.log(err);
    }
});

export const getAllOrdersOfShopAsync = createAsyncThunk('order/getAllOrdersOfShop', async (shopId) => {
    try {
        const response = await axios.get(`${server}/order/get-seller-all-orders/${shopId}`);
        return response.data;
    } catch (err) {
        return console.log(err);
    }
});

export const getAllOrdersOfAdminAsync = createAsyncThunk('order/getAllOrdersOfAdmin', async () => {
    try {
        const response = await axios.get(`${server}/order/admin-all-orders`, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        return console.log(err);
    }
});

const initialState = {
    orders: [],
    adminOrders: [],
    isLoading: true,
    adminOrderLoading: true,
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        getAllOrdersOfUser: (state, payload) => {
            state.isLoading = false;
            state.orders = payload.orders;
        },
        getAllOrdersOfShop: (state, payload) => {
            state.isLoading = false;
            state.orders = payload.orders;
        },
        getAllOrders: (state, payload) => {
            state.adminOrderLoading = false;
            state.adminOrders = payload.orders;
        },
    },
    extraReducers: {
        [getAllOrdersOfUserAsync.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getAllOrdersOfUserAsync.fulfilled.type]: (state, { payload }) => {
            state.isLoading = false;
            state.orders = payload.orders;
        },
        [getAllOrdersOfUserAsync.rejected.type]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getAllOrdersOfShopAsync.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getAllOrdersOfShopAsync.fulfilled.type]: (state, { payload }) => {
            state.isLoading = false;
            state.orders = payload.orders;
        },
        [getAllOrdersOfShopAsync.rejected.type]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getAllOrdersOfAdminAsync.pending.type]: (state) => {
            state.adminOrderLoading = true;
        },
        [getAllOrdersOfAdminAsync.fulfilled.type]: (state, { payload }) => {
            state.adminOrderLoading = false;
            state.adminOrders = payload.orders;
        },
        [getAllOrdersOfAdminAsync.rejected.type]: (state, { payload }) => {
            state.adminOrderLoading = false;
            state.error = payload;
        },
    },
});

export const { getAllOrdersOfUser, getAllOrdersOfShop, getAllOrdersOfAdmin } = orderSlice.actions;
export default orderSlice.reducer;
