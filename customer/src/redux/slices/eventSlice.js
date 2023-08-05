import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { server } from '../../server';
import axios from 'axios';

export const getAllEventsAsync = createAsyncThunk('event/getAllEvents', async () => {
    try {
        const response = await axios.get(`${server}/event/get-all-events`);
        return response.data;
    } catch (err) {
        return console.log(err);
    }
});

const initialState = {
    events: [],
    isLoading: true,
    error: null,
};

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        getAllEvents: (state, payload) => {
            state.isLoading = false;
            state.events = payload.events;
        },
    },
    extraReducers: {
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
