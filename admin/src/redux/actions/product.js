import axios from 'axios';
import { server } from '../../server';

export const getAllProductsShop = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'getAllProductsShopRequest',
        });

        const { data } = await axios.get(`${server}/product/get-all-products-shop/${id}`);
        dispatch({
            type: 'getAllProductsShopSuccess',
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: 'getAllProductsShopFailed',
            payload: error.response.data.message,
        });
    }
};

export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: 'getAllProductsRequest',
        });

        const { data } = await axios.get(`${server}/product/get-all-products`);
        dispatch({
            type: 'getAllProductsSuccess',
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: 'getAllProductsFailed',
            payload: error.response.data.message,
        });
    }
};
