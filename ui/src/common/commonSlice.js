import { createSlice } from '@reduxjs/toolkit';
import { firstRequested, secondRequested } from '../screens/Dashboard/dashboardSlice';
import { loginRequested } from '../screens/Login/loginSlice';
import { openErrorToast } from './toast';
import { LOADING_KEYS, DEFAULT_TOAST_ERROR, COMMON_SLICE_NAME } from './constants';

const commonSlice = createSlice({
    name: COMMON_SLICE_NAME,
    initialState: {
        loadings: [],
        errors: [],
    },
    reducers: {
    },
    extraReducers: {
        [loginRequested.pending]: (state) => {
            state.loadings.push(LOADING_KEYS.LOGIN_REQUESTED);
        },
        [loginRequested.fulfilled]: (state, first) => {
            state.loadings = state.loadings.filter(loading => loading !== LOADING_KEYS.LOGIN_REQUESTED);
        },
        [loginRequested.rejected]: (state, data) => {
            openErrorToast(typeof(data.error.message) === 'string' ? data.error.message : DEFAULT_TOAST_ERROR);
            state.loadings = state.loadings.filter(loading => loading !== LOADING_KEYS.LOGIN_REQUESTED);
        },
    },
});

export const { } = commonSlice.actions;

export const getLoadings = (state) => state.common.loadings;

export default commonSlice.reducer;