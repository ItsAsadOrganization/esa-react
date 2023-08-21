import { createSlice } from '@reduxjs/toolkit';
import { firstRequested, secondRequested } from '../screens/Dashboard/dashboardSlice';
import { loginRequested } from '../screens/Login/loginSlice';
import { openErrorToast } from './toast';
import { LOADING_KEYS, DEFAULT_TOAST_ERROR, COMMON_SLICE_NAME } from './constants';

const commonSlice = createSlice({
    name: COMMON_SLICE_NAME,
    initialState: {
        loadings: 0,
        errors: [],
    },
    reducers: {
        handleAddLoading: (state, action) => {
            state.loadings++
        },
        handleRemoveLoading: (state, action) => {
            state.loadings--
        }
    },
    extraReducers: {

    },
});

export const {
    handleAddLoading,
    handleRemoveLoading
} = commonSlice.actions;

export const getLoadings = (state) => state.common.loadings;

export default commonSlice.reducer;