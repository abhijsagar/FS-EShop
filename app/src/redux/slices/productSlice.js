import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { server } from '../../../server';
import axios from 'axios';

export const createProductAsync = createAsyncThunk(
    'product/createProduct',
    async (name, description, category, tags, originalPrice, discountPrice, stock, shopId, images) => {
        try {
            const response = await axios.post(
                `${server}/product/create-product`,
                name,
                description,
                category,
                tags,
                originalPrice,
                discountPrice,
                stock,
                shopId,
                images
            );
            return response.data;
        } catch (err) {
            return console.log(err);
        }
    }
);

export const getAllProductsShopAsync = createAsyncThunk('product/getAllProductsShop', async (id) => {
    try {
        const response = await axios.get(`${server}/product/get-all-products-shop/${id}`);
        return response.data;
    } catch (err) {
        return console.log(err);
    }
});

export const deleteProductAsync = createAsyncThunk('product/deleteProduct', async (id) => {
    try {
        const response = await axios.delete(`${server}/product/delete-shop-product/${id}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        return console.log(err);
    }
});

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
    allProducts: [],
    isLoading: true,
    success: true,
    message: '',
    error: null,
};

export const productSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        createProduct: (state, payload) => {
            state.isLoading = false;
            state.product = payload.product;
            state.success = true;
        },
        getAllProductsShop: (state, payload) => {
            state.isLoading = false;
            state.products = payload.products;
        },
        deleteProduct: (state, payload) => {
            state.isLoading = false;
            state.message = payload.message;
        },
        getAllProducts: (state, payload) => {
            state.isLoading = false;
            state.allProducts = payload.products;
        },
    },
    extraReducers: {
        [createProductAsync.pending.type]: (state) => {
            state.isLoading = true;
        },
        [createProductAsync.fulfilled.type]: (state, { payload }) => {
            state.isLoading = false;
            state.product = payload.product;
            state.success = true;
        },
        [createProductAsync.rejected.type]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
            state.success = false;
        },
        [getAllProductsShopAsync.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getAllProductsShopAsync.fulfilled.type]: (state, { payload }) => {
            state.isLoading = false;
            state.allProducts = payload.products;
        },
        [getAllProductsShopAsync.rejected.type]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [deleteProductAsync.pending.type]: (state) => {
            state.isLoading = true;
        },
        [deleteProductAsync.fulfilled.type]: (state, { payload }) => {
            state.isLoading = false;
            state.message = payload.message;
        },
        [deleteProductAsync.rejected.type]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getAllProductsAsync.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getAllProductsAsync.fulfilled.type]: (state, { payload }) => {
            state.isLoading = false;
            state.allProducts = payload.products;
        },
        [getAllProductsAsync.rejected.type]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
    },
});

export const { createProduct, getAllProductsShop, deleteProduct, getAllProducts } = productSlice.actions;
export default productSlice.reducer;
