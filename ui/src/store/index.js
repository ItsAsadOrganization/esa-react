import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../screens/Login/loginSlice';
import dashboardReducer from '../screens/Dashboard/dashboardSlice';
import commonReducer from '../common/commonSlice';
import { persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { removeItem } from '../utils/storage';
import { HANDLE_LOGOUT } from '../screens/Login/constants';
import { REDUX_PERSIST_KEY, PERSIST_STORAGE_ITEM_KEY} from '../common/constants';
import setupVoucherReducer from '../screens/SetupVoucher/setupVoucherSlice';
import voucherReducer from '../screens/Vouchers/voucherSlice';

const persistConfig = {
    key: REDUX_PERSIST_KEY,
    version: 1,
    storage,
  }

const appReducer = combineReducers({
    login: loginReducer,
    dashboard: dashboardReducer,
    common: commonReducer,
    setupVoucher: setupVoucherReducer,
    voucher: voucherReducer
});

const rootReducer = (state, action) => {
    if (action.type === HANDLE_LOGOUT) {
      removeItem(PERSIST_STORAGE_ITEM_KEY);
      state = undefined;
    }
    return appReducer(state, action)
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
              ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
        }),
});

export const dispatch = store.dispatch;

export default store;