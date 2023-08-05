import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { server } from '../../../server';
import axios from 'axios';

export const createEventAsync = createAsyncThunk('event/createEvent', async (data) => {
    try {
        const response = await axios.post(`${server}/event/create-event`, data);
        return response.data;
    } catch (err) {
        return console.log(err);
    }
});

export const getAllEventsShopAsync = createAsyncThunk('event/getAllEventsShop', async (id) => {
    try {
        const response = await axios.get(`${server}/event/get-all-events/${id}`);
        return response.data;
    } catch (err) {
        return console.log(err);
    }
});

export const deleteEventAsync = createAsyncThunk('event/deleteEvent', async (id) => {
    try {
        const response = await axios.delete(`${server}/event/delete-shop-event/${id}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        return console.log(err);
    }
});

export const getAllEventsAsync = createAsyncThunk('event/getAllEvents', async () => {
    try {
        const response = await axios.get(`${server}/event/get-all-events`);
        return response.data;
    } catch (err) {
        return console.log(err);
    }
});

const initialState = {
    event: {},
    events: [],
    message: '',
    allEvents: [],
    isLoading: true,
    success: true,
    error: null,
};

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        createEvent: (state, payload) => {
            state.isLoading = false;
            state.event = payload.event;
            state.success = true;
        },
        getAllEventsShop: (state, payload) => {
            state.isLoading = false;
            state.events = payload.events;
        },
        deleteEvent: (state, payload) => {
            state.isLoading = false;
            state.message = payload.message;
        },
        getAllEvents: (state, payload) => {
            state.isLoading = false;
            state.allEvents = payload.events;
        },
    },
    extraReducers: {
        [createEventAsync.pending.type]: (state) => {
            state.isLoading = true;
        },
        [createEventAsync.fulfilled.type]: (state, { payload }) => {
            state.isLoading = false;
            state.event = payload.event;
            state.success = true;
        },
        [createEventAsync.rejected.type]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
            state.success = false;
        },
        [getAllEventsShopAsync.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getAllEventsShopAsync.fulfilled.type]: (state, { payload }) => {
            state.isLoading = false;
            state.allEvents = payload.events;
        },
        [getAllEventsShopAsync.rejected.type]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [deleteEventAsync.pending.type]: (state) => {
            state.isLoading = true;
        },
        [deleteEventAsync.fulfilled.type]: (state, { payload }) => {
            state.isLoading = false;
            state.message = payload.message;
        },
        [deleteEventAsync.rejected.type]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getAllEventsAsync.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getAllEventsAsync.fulfilled.type]: (state, { payload }) => {
            state.isLoading = false;
            state.events = payload.events;
        },
        [getAllEventsAsync.rejected.type]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
    },
});

export const { createEvent, getAllEventsShop, deleteEvent, getAllEvents } = eventSlice.actions;
export default eventSlice.reducer;
