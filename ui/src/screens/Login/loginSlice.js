import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { removeAuthToken } from '../../api/utils';
import { AUTH_TOKEN_KEY } from '../../common/constants';
import { removeItem } from '../../utils/storage';
import { loginUserApi } from '../../api';
import { LOGIN_SLICE_NAME, LOGIN_REQUESTED, TOKEN_MISSING_ERROR } from './constants';

export const loginRequested = createAsyncThunk(LOGIN_REQUESTED, async ({ username, password }) => {
    try {
        const response = await loginUserApi(username, password);
        // if(response.headers.authorization) {
        return response;
        // }
        // throw TOKEN_MISSING_ERROR;
    }
    catch (err) {
        console.log({ err })
        throw err.data;
    }
});

const loginSlice = createSlice({
    name: LOGIN_SLICE_NAME,
    initialState: {
        isLoggedIn: false,
        username: null,
        permissions: [],
        role: null,
        email: null,
        id: null,
    },
    reducers: {
        handleLogout: (state, action) => {
            removeItem(AUTH_TOKEN_KEY);
            // removeAuthToken();
            state.isLoggedIn = false;
            state.id = null;
            state.username = null;
            state.permissions = [];
            state.role = '';
        }
    },
    extraReducers: {
        [loginRequested.pending]: (state) => {
            state.isLoading = true;
        },
        [loginRequested.fulfilled]: (state, user) => {
            state.id = user.payload.data.user.id;
            state.username = user.payload.data.user.name;
            state.isLoggedIn = true;
            state.role = user.payload.data.user["role.name"];
            state.email = user.payload.data.user.email;
            state.permissions = user.payload.data.user["role.permissions"];
            state.isLoading = false;
        },
        [loginRequested.rejected]: (state, data) => {
            state.isLoggedIn = false;
            state.error = data;
            state.isLoading = false;
            state.email = null;
            state.id = null;
        }
    }
});

export const { handleLogout } = loginSlice.actions;

export const isUserLoggedIn = (state) => state.login.isLoggedIn;
export const getUserName = (state) => state.login.username;
export const getUserPermissions = (state) => state.login.permissions;
export const getUserRole = (state) => state.login.role;
export const getUserEmail = (state) => state.login.email;
export const getUserId = (state) => state.login.id;

export default loginSlice.reducer;