import axios from 'axios';
import {
    NETWORK_ERROR
} from './constants';
import { AUTH_TOKEN_KEY } from '../common/constants';

import { dispatch } from '../store';
import { handleLogout } from '../screens/Login/loginSlice';
import { setItem, getItem } from '../utils/storage';
import { openErrorToast } from '../common/toast';


axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

if (getItem(AUTH_TOKEN_KEY)) {
    axios.defaults.headers['authorization'] = getItem(AUTH_TOKEN_KEY);
    document.cookie = `authorization=${getItem(AUTH_TOKEN_KEY)}`;
}

const client = axios;

export const setAuthToken = (token) => {
    axios.defaults.headers['authorization'] = token;
    document.cookie = `authorization=${token}`;
};

export const removeAuthToken = () => {
    delete axios.defaults.headers['authorization'];
    document.cookie = `authorization=${undefined}`;
};

// to parse error(s) caught by axios during any HTTP request
export function parseClientError(error) {
    let parsed = 'Seems like a cog stopped moving.';

    if (error.response && error.response.status === 401) {
        openErrorToast(error.response.data.data);
        dispatch(handleLogout());
    }
    const message = (error.response
        && error.response.data)
        || error.message
        || error.toString();
    return message;

    // const message = (error.response
    //     && error.response.data
    //     && error.response.data.message)
    //     || error.message
    //     || error.toString();
    // return message;

    // if (error.response && error.response.data) {
    //     console.log('in response error');
    //     parsed = error.response.data;
    // } else if (error.message) {
    //     console.log('in mesage error');
    //     parsed = error.message;
    // } else if(error.request) {
    //     console.log('in request error');
    //     parsed = error.request;
    // }
    // else {
    //     console.log('in default error');
    //     parsed = error;
    // }

    // return parsed;
}

async function request(method, url, data = {}, params = {}, headers = {}) {
    try {
        const response = await client({
            method: method,
            url: url,
            data: data,
            params: params,
            headers: headers
        });
        if (response.headers.authorization) {
            setAuthToken(response.headers.authorization);
            setItem(AUTH_TOKEN_KEY, response.headers.authorization);
        }
        return response;
    } catch (e) {
        throw parseClientError(e);
    }
}

export async function post(url, data = {}, params = {}, headers = {}) {
    return await request('post', url, data, params, headers);
}

export async function get(url, data = {}, params = {}) {
    return await request('get', url, data, params);
}

export async function del(url, data = {}, params = {}) {
    return await request('delete', url, data, params);
}

export async function put(url, data = {}, params = {}, headers = {}) {
    return await request('put', url, data, params, headers);
}