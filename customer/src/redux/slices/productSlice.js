import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { server } from '../../server';
import axios from 'axios';

export const getAllProductsAsync = createAsyncThunk('product/getAllProducts', async () => {
    try {
        const response = await axios.get(`${server}/product/get-all-products`);
        return response.data;
    } catch (err) {
        return console.log(err);
    }
});

const initialState = {
    products: [],
    isLoading: true,
    error: null,
};

export const productSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getAllProducts: (state, payload) => {
            state.isLoading = false;
            state.products = payload.products;
        },
    },
    extraReducers: {
        [getAllProductsAsync.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getAllProductsAsync.fulfilled.type]: (state, { payload }) => {
            state.isLoading = false;
            state.products = payload.products;
        },
        [getAllProductsAsync.rejected.type]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
    },
});

export const { createProduct, getAllProductsShop, deleteProduct, getAllProducts } = productSlice.actions;
export default productSlice.reducer;
