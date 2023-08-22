import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOGS_REQUESTED, LOG_SLICE_NAME } from "./constants";
import { getLogsApi } from "../../api";

export const logsRequested = createAsyncThunk(LOGS_REQUESTED, async () => {
    try {
        const response = await getLogsApi()
        return response
    } catch (err) {
        throw err
    }
})

const logSlice = createSlice({
    name: LOG_SLICE_NAME,
    initialState: {
        logsList: []
    },
    reducers: {
        handeResetSlice:(state) => {
            state.logsList = []
        }
    },
    extraReducers: builder => {
        builder.addCase(logsRequested.fulfilled, (state, action) => {
            state.logsList = action.payload.data.logs
        })
    }
})

export const {
    handeResetSlice
 } = logSlice.actions

export const getLogsList = (state) => state.logs.logsList

export default logSlice.reducer