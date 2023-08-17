import { createSlice } from '@reduxjs/toolkit';
import { DASHBOARD_SLICE_NAME } from './constants';

const dashboardSlice = createSlice({
    name: DASHBOARD_SLICE_NAME,
    initialState: {
    },
    reducers: {
    },
    extraReducers: {
    }
});

export const {  } = dashboardSlice.actions;

export default dashboardSlice.reducer;