import { getPaySlipsyApi } from "../../api";
import { PAYSLIPS_REQUESTED, PAYSLIP_SLICE_NAME } from "./constants";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const payslipsRequested = createAsyncThunk(PAYSLIPS_REQUESTED, async () => {
    try {
        const response = await getPaySlipsyApi()
        return response
    } catch (err) {
        throw err
    }
})

const paySlipSlice = createSlice({
    name: PAYSLIP_SLICE_NAME,
    initialState: {
        paySlipsList: [],
        paySlipId: null,
        paySlipConfig: {},
        paySlipModalOpen: false
    },
    reducers: {
        handleChangePaySlipId: (state, action) => { state.paySlipId = action.payload },
        handleChangePaySlipConfig: (state, action) => { state.paySlipConfig = action.payload },
        handleChangePaySlipModalOpen: (state, action) => { state.paySlipModalOpen = action.payload },
    },
    extraReducers: builder => {
        builder.addCase(payslipsRequested.fulfilled, (state, actions) => {
            state.paySlipsList = actions.payload.data.payslips
        })
    }
})

export const {
    handleChangePaySlipId,
    handleChangePaySlipConfig,
    handleChangePaySlipModalOpen
} = paySlipSlice.actions

export const getPaySlipsList = (state) => state.paySlip.paySlipsList
export const getPaySlipModelOpen = (state) => state.paySlip.paySlipModalOpen
export const getPaySlipId = (state) => state.paySlip.paySlipId
export const getPaySlipConfig = (state) => state.paySlip.paySlipConfig

export default paySlipSlice.reducer