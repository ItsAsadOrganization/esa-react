import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CLASSES_REQUESTED, SETUP_VOUCHER_SLICE_NAME, STUDENT_BY_CLASSES_REQUESTED } from "./constants";
import { getAllClasses, getStudentById } from "../../api";

export const classesRequested = createAsyncThunk(CLASSES_REQUESTED, async () => {
    try {
        const response = await getAllClasses()
        return response
    } catch (err) {
        throw err
    }
})

export const studentByClassesRequested = createAsyncThunk(STUDENT_BY_CLASSES_REQUESTED, async ({ class_id }) => {
    try {
        const response = await getStudentById({ class_id })
        return response
    } catch (err) {
        throw err
    }
})

const setupVoucherSlice = createSlice({
    name: SETUP_VOUCHER_SLICE_NAME,
    initialState: {
        voucher: {
            studentId: "",
            classId: "",
            date_issued: "",
            date_expiry: "",
            is_paid: false,
            payment_mode: "",
            config: {
                fee_details: [],
                total_amount: 0,
                discount: 0,
                sub_total: 0
            },
        },
        classList: [],
        studentsList: []
    },
    reducers: {
        handleChangeStudentId: (state, action) => { state.voucher.studentId = action.payload },
        handleChangeClassId: (state, action) => { state.voucher.classId = action.payload },
        handleChangeDateIssued: (state, action) => { state.voucher.date_issued = action.payload },
        handleChangeDateExpiry: (state, action) => { state.voucher.date_expiry = action.payload },
        handleChangeIsPaid: (state, action) => { state.voucher.is_paid = action.payload },
        handleChangePaymentMode: (state, action) => { state.voucher.payment_mode = action.payload },
        handleChangeConfigTrackingId: (state, action) => { state.voucher.config.tracking_id = action.payload },
        handleChangeConfigFeeDetails: (state, action) => {
            if (action.payload.operation === "add") {
                delete action.payload.operation
                state.voucher.config.fee_details = [...state.voucher.config.fee_details, { ...action.payload.fee_details }]
                state.voucher.config.total_amount = parseFloat(state.voucher.config.total_amount) + parseFloat(action.payload.fee_details.fee_amount)
            } else {
                state.voucher.config.total_amount = parseFloat(state.voucher.config.total_amount) - parseFloat(state.voucher.config.fee_details[action.payload.index].fee_amount)
                state.voucher.config.sub_total = parseFloat(state.voucher.config.total_amount) - parseFloat(state.voucher.config.fee_details[action.payload.index].fee_amount)
                state.voucher.config.fee_details.splice(action.payload.index, 1)
            }
            state.voucher.config.sub_total = parseFloat(state.voucher.config.total_amount) - ((parseFloat(state.voucher.config.discount) / 100) * parseFloat(state.voucher.config.total_amount))
        },
        handleChangeConfigFeeDetailsDiscount: (state, action) => {
            state.voucher.config.discount = action.payload
            state.voucher.config.sub_total = parseFloat(state.voucher.config.total_amount) - ((parseFloat(action.payload) / 100) * parseFloat(state.voucher.config.total_amount))
        },
        handleResetSlice: (state) => {
            state.voucher.studentId = ""
            state.voucher.classId = ""
            state.voucher.date_issued = ""
            state.voucher.date_expiry = ""
            state.voucher.is_paid = false
            state.voucher.payment_mode = ""
            state.voucher.config.fee_details = []
            state.voucher.config.total_amount = 0
            state.voucher.config.discount = 0
            state.voucher.config.sub_total = 0
                state.classList = []
            state.studentsList = []
        }
    },
    extraReducers: builder => {
        builder.addCase(classesRequested.fulfilled, (state, action) => {
            state.classList = action.payload.data.classes
        })
        builder.addCase(studentByClassesRequested.fulfilled, (state, action) => {
            state.studentsList = action.payload.data.student
        })
    }
})

export const {
    handleChangeStudentId,
    handleChangeClassId,
    handleChangeDateIssued,
    handleChangeDateExpiry,
    handleChangeIsPaid,
    handleChangePaymentMode,
    handleChangeConfigTrackingId,
    handleResetSlice,
    handleChangeConfigFeeDetails,
    handleChangeConfigFeeDetailsDiscount
} = setupVoucherSlice.actions

export const getVoucher = state => state.setupVoucher.voucher
export const getClassList = state => state.setupVoucher.classList
export const getStudentsList = state => state.setupVoucher.studentsList

export default setupVoucherSlice.reducer