import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.cart.find((item) => item._id === action.payload._id);
            if (item) {
                item.qty += action.payload.qty;
            } else {
                state.cart.push(action.payload);
            }
        },
        removeFromCart: (state, action) => {
            return {
                ...state,
                cart: state.cart.filter((i) => i._id !== action.payload),
            };
        },
        increaseQuantity: (state, action) => {
            const item = state.cart.find((item) => item._id === action.payload._id);
            if (item) {
                item.qty++;
            }
        },
        drecreaseQuantity: (state, action) => {
            const item = state.cart.find((item) => item._id === action.payload._id);
            if (item.qty === 1) {
                item.qty = 1;
            } else {
                item.qty--;
            }
        },
        resetCart: (state) => {
            state.cart = [];
        },
    },
});

export const { addToCart, removeFromCart, drecreaseQuantity, increaseQuantity, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
