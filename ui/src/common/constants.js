import { toast } from "react-toastify";
import { LOGIN_REQUESTED } from "../screens/Login/constants";


export const AUTH_TOKEN_KEY = 'secret';

export const REDUX_PERSIST_KEY = 'root';

export const PERSIST_STORAGE_ITEM_KEY = `persist:${REDUX_PERSIST_KEY}`;

export const TOAST = {
    POSITION: toast.POSITION.BOTTOM_LEFT,
    ICON: true, //false, <Icon />
    THEME: 'light', //"dark", "colored",
    TIMEOUT: 5000,
    PAUSE_ON_BLUR: false,
    DELAY: 0
};

export const LOADING_KEYS = {
    LOGIN_REQUESTED,
}

export const DEFAULT_TOAST_ERROR = 'Error Occured!';

export const COMMON_SLICE_NAME = 'common';