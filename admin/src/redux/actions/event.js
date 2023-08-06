import axios from 'axios';
import { server } from '../../server';

export const getAllEventsShop = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'getAlleventsShopRequest',
        });

        const { data } = await axios.get(`${server}/event/get-all-events/${id}`);
        dispatch({
            type: 'getAlleventsShopSuccess',
            payload: data.events,
        });
    } catch (error) {
        dispatch({
            type: 'getAlleventsShopFailed',
            payload: error.response.data.message,
        });
    }
};

export const getAllEvents = () => async (dispatch) => {
    try {
        dispatch({
            type: 'getAlleventsRequest',
        });

        const { data } = await axios.get(`${server}/event/get-all-events`);
        dispatch({
            type: 'getAlleventsSuccess',
            payload: data.events,
        });
    } catch (error) {
        dispatch({
            type: 'getAlleventsFailed',
            payload: error.response.data.message,
        });
    }
};
