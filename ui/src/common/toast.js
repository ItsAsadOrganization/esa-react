import { toast } from "react-toastify";
import { TOAST } from './constants';

export const openErrorToast = (message) => {
    toast.error(message, {
        position: TOAST.POSITION,
        icon: TOAST.ICON,
        theme: TOAST.THEME,
        autoClose: TOAST.TIMEOUT,
        pauseOnFocusLoss: TOAST.PAUSE_ON_BLUR,
        delay: TOAST.DELAY
    });
}

export const openSuccessToast = (message) => {
    toast.success(message, {
        position: TOAST.POSITION,
        icon: TOAST.ICON,
        theme: TOAST.THEME,
        autoClose: TOAST.TIMEOUT,
        pauseOnFocusLoss: TOAST.PAUSE_ON_BLUR,
        delay: TOAST.DELAY
    });
}