import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DASHBOARD_SLICE_NAME, EXPIRING_VOUCHERS_REQUESTED, QUERIES_LIST_REQUESTED, STUDENTS_LIST_REQUESTED, USERS_LIST_REQUESTED } from './constants';
import { getAllStudents, getExpiringVouchersApi, getQueriesApi } from '../../api';


export const queryiesListRequested = createAsyncThunk(QUERIES_LIST_REQUESTED, async ({ userId = null }) => {
    try {
        const response = await getQueriesApi({ id: userId })
        return response
    } catch (err) {
        throw err
    }
})

export const studentsListRequested = createAsyncThunk(STUDENTS_LIST_REQUESTED, async () => {
    try {
        const response = await getAllStudents()
        return response
    } catch (err) {
        throw err
    }
})

export const expiringVouchersRequested = createAsyncThunk(EXPIRING_VOUCHERS_REQUESTED, async () => {
    try {
        const response = await getExpiringVouchersApi()
        return response
    } catch (err) {
        throw err
    }
})


const dashboardSlice = createSlice({
    name: DASHBOARD_SLICE_NAME,
    initialState: {
        expiringVouchersList: [],
        studentsList: [],
        queriesList: [],
        usersList: [], // active users
    },
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(queryiesListRequested.fulfilled, (state, action) => {
            state.queriesList = action.payload.data.queries
        })
        builder.addCase(studentsListRequested.fulfilled, (state, action) => {
            state.studentsList = action.payload.data.students
        })
        builder.addCase(expiringVouchersRequested.fulfilled, (state, action) => {
            state.expiringVouchersList = action.payload.data.voucher.map(v => ({ ...v, voucher_id: `EGC-${v.id}` }))
        })
    }
});

export const { } = dashboardSlice.actions;

export const getExpiringVouchersList = state => state.dashboard.expiringVouchersList
export const getStudentsList = state => state.dashboard.studentsList
export const getQueriesList = state => state.dashboard.queriesList
export const getUsersList = state => state.dashboard.usersList
export default dashboardSlice.reducer;