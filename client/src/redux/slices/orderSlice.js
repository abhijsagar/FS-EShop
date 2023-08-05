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

const initialState = {
    orders: [],
    isLoading: true,
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        getAllOrdersOfUser: (state, payload) => {
            state.isLoading = false;
            state.orders = payload.orders;
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
    },
});

export const { getAllOrdersOfUser, getAllOrdersOfShop, getAllOrdersOfAdmin } = orderSlice.actions;
export default orderSlice.reducer;
