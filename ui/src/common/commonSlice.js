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
        notification: [],
    },
    reducers: {
        handleAddLoading: (state, action) => {
            state.loadings++
        },
        handleRemoveLoading: (state, action) => {
            state.loadings--
        },
        handleChangeNotificaiton: (state, action)=> {
            state.notification = action.payload
        }
    },
    extraReducers: {

    },
});

export const {
    handleAddLoading,
    handleRemoveLoading,
    handleChangeNotificaiton
} = commonSlice.actions;

export const getLoadings = (state) => state.common.loadings;
export const getNotifications = (state) => state.common.notification;

export default commonSlice.reducer;