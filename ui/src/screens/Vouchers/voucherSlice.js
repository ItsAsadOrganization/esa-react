import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EXPIRING_VOUCHERS_REQUESTED, STUDENTS_REQUESTED, VOUCHER_SLICE_NAME, VOUCHERs_REQUESTED } from "./constants";
import { getAllClasses, getAllStudents, getAllVouchers, getExpiringVouchersApi } from "../../api";
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

export const expiringVouchersRequested = createAsyncThunk(EXPIRING_VOUCHERS_REQUESTED, async () => {
    try {
        const response = await getExpiringVouchersApi()
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
        reference: "",
        search: "",

        classSearch: "",
        studentSearch: "",
        paymentStatusSearch: "",
        startDateSearch: "",
        dueDateSearch: "",
        showExpiring: false
    },
    reducers: {
        handleChangeDrawerOpen: (state, action) => { state.drawerOpen = action.payload },
        handleChangeDrawerUser: (state, action) => { state.drawerUser = action.payload },
        handleChangeVoucherModalOpen: (state, action) => { state.dialogOpen = action.payload },
        handleChangeVoucherPaid: (state, action) => { state.drawerUser.is_paid = action.payload },
        handleChangeVoucherPaymentMode: (state, action) => { state.drawerUser.payment_mode = action.payload },
        handleChangeVoucherSearch: (state, action) => { state.search = action.payload },

        handleChangeVoucherSearchClass: (state, action) => { state.classSearch = action.payload },
        handleChangeVoucherSearchStudent: (state, action) => { state.studentSearch = action.payload },


        handleChangePaymentModeSearch: (state, action) => { state.paymentStatusSearch = action.payload },
        handleChangeStartDateSearch: (state, action) => { state.startDateSearch = action.payload },
        handleChangeDueDateSearch: (state, action) => { state.dueDateSearch = action.payload },
        handleChangeShowExpiring: (state, action) => { state.showExpiring = action.payload },

        handleChangeVoucherPaymentReference: (state, action) => {
            state.reference = action.payload
            state.drawerUser.config["reference"] = action.payload
        },
        handleResetPaymentModal: (state, action) => {
            state.drawerOpen = false
            state.drawerUser = null
            state.dialogOpen = false
            state.reference = ""
        }
    },
    extraReducers: builder => {
        builder.addCase(vouchersRequested.fulfilled, (state, action) => {
            state.vouchersList = action.payload.data.voucher.map(v => ({ ...v, voucher_id: `EGC-${v.id}` }))
        })
        builder.addCase(classesRequested.fulfilled, (state, action) => {
            state.classes = action.payload.data.classes
        })
        builder.addCase(studentsRequested.fulfilled, (state, action) => {
            state.students = action.payload.data.students
        })
        builder.addCase(expiringVouchersRequested.fulfilled, (state, action) => {
            state.vouchersList = action.payload.data.voucher.map(v => ({ ...v, voucher_id: `EGC-${v.id}` }))
        })
    }
})

export const {
    handleChangeDrawerOpen,
    handleChangeDrawerUser,
    handleChangeVoucherID,
    handleChangeVoucherPaid,
    handleChangeVoucherPaymentMode,
    handleChangeVoucherModalOpen,
    handleChangeVoucherPaymentReference,
    handleResetPaymentModal,
    handleChangeVoucherSearch,
    handleChangeVoucherSearchClass,
    handleChangeVoucherSearchStudent,
    handleChangePaymentModeSearch,
    handleChangeStartDateSearch,
    handleChangeDueDateSearch,
    handleChangeShowExpiring
} = voucherSlice.actions

export const getVouchersList = state => state.voucher.vouchersList
export const getStudentsList = state => state.voucher.students
export const getClassesList = state => state.voucher.classes
export const getDrawerOpen = state => state.voucher.drawerOpen
export const getDrawerUSer = state => state.voucher.drawerUser
export const getDialogOpen = state => state.voucher.dialogOpen
export const getRerence = state => state.voucher.reference
export const getSearch = state => state.voucher.search

export const getClassSearch = state => state.voucher.classSearch
export const getStudentSearch = state => state.voucher.studentSearch
export const getPaymentStatusSearch = state => state.voucher.paymentStatusSearch
export const getStartDateSearch = state => state.voucher.startDateSearch
export const getDueDateSearch = state => state.voucher.dueDateSearch
export const getShowExpiring = state => state.voucher.showExpiring
export default voucherSlice.reducer