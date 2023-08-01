import { createSlice } from '@reduxjs/toolkit';
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.cart.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                itemInCart.qty++;
            } else {
                state.cart.push({ ...action.payload, qty: 1 });
            }
        },
        incrementqty: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload);
            item.qty++;
        },
        decrementqty: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload);
            if (item.qty === 1) {
                item.qty = 1;
            } else {
                item.qty--;
            }
        },
        removeItem: (state, action) => {
            const removeItem = state.cart.filter((item) => item.id !== action.payload);
            state.cart = removeItem;
        },
        resetCart: (state) => {
            state.products = [];
        },
    },
});
export const cartReducer = cartSlice.reducer;
export const { addToCart, incrementqty, decrementqty, removeItem, resetCart } = cartSlice.actions;