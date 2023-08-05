import axios from 'axios';
import { server } from '../../server';

export const getAllOrdersOfAdmin = () => async (dispatch) => {
    try {
        dispatch({
            type: 'adminAllOrdersRequest',
        });

        const { data } = await axios.get(`${server}/order/admin-all-orders`, {
            withCredentials: true,
        });

        dispatch({
            type: 'adminAllOrdersSuccess',
            payload: data.orders,
        });
    } catch (error) {
        dispatch({
            type: 'adminAllOrdersFailed',
            payload: error.response.data.message,
        });
    }
};
