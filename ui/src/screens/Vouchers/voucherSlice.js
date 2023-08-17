import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STUDENTS_REQUESTED, VOUCHER_SLICE_NAME, VOUCHERs_REQUESTED } from "./constants";
import { getAllClasses, getAllStudents, getAllVouchers } from "../../api";
import { CLASSES_REQUESTED } from "../SetupVoucher/constants";

export const vouchersRequested = createAsyncThunk(VOUCHERs_REQUESTED, async () => {
    try {
        const response = await getAllVouchers()
        return response
    } catch (err) {
        throw err
    }
})



export const classesRequested = createAsyncThunk(CLASSES_REQUESTED, async () => {
    try {
        const response = await getAllClasses()
        return response
    } catch (err) {
        throw err
    }
})

export const studentsRequested = createAsyncThunk(STUDENTS_REQUESTED, async () => {
    try {
        const response = await getAllStudents()
        return response
    } catch (err) {
        throw err
    }
})

const voucherSlice = createSlice({
    name: VOUCHER_SLICE_NAME,
    initialState: {
        vouchersList: [],
        students: [],
        classes: [],
        drawerOpen: false,
        drawerUser: null,
        dialogOpen: false,
        voucher: {
            id: null,
            is_paid: false,
            payment_mode: ""
        }
    },
    reducers: {
        handleChangeDrawerOpen: (state, action) => { state.drawerOpen = action.payload },
        handleChangeDrawerUser: (state, action) => { state.drawerUser = action.payload },
        handleChangeVoucherModalOpen: (state, action) => { state.dialogOpen = action.payload },
        handleChangeVoucherID: (state, action) => { state.id = action.payload },
        handleChangeVoucherPaid: (state, action) => { state.voucher.is_paid = action.payload },
        handleChangeVoucherPaymentMode: (state, action) => { state.voucher.payment_mode = action.payload },
    },
    extraReducers: builder => {
        builder.addCase(vouchersRequested.fulfilled, (state, action) => {
            state.vouchersList = action.payload.data.voucher
        })
        builder.addCase(classesRequested.fulfilled, (state, action) => {
            state.classes = action.payload.data.classes
        })
        builder.addCase(studentsRequested.fulfilled, (state, action) => {
            state.students = action.payload.data.studentz
        })
    }
})

export const {
    handleChangeDrawerOpen,
    handleChangeDrawerUser,
    handleChangeVoucherID,
    handleChangeVoucherPaid,
    handleChangeVoucherPaymentMode,
    handleChangeVoucherModalOpen
} = voucherSlice.actions

export const getVouchersList = state => state.voucher.vouchersList
export const getStudentsList = state => state.voucher.students
export const getClassesList = state => state.voucher.classes
export const getDrawerOpen = state => state.voucher.drawerOpen
export const getDrawerUSer = state => state.voucher.drawerUser
export const getVoucher = state => state.voucher.voucher
export const getDialogOpen = state => state.voucher.dialogOpen
export default voucherSlice.reducer