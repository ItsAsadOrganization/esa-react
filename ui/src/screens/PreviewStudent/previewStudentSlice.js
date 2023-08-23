import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PREVIEW_STUDENT_CLASSES_REQUESTED, PREVIEW_STUDENT_REQUESTED, PREVIEW_STUDENT_SLICE_NAME, PREVIEW_STUDENT_VOUCHERS_REQUESTED } from "./constants";
import { getAllClasses, getStudentByStudentId, getStudentVouchersApi } from "../../api";


export const previewStudentRequested = createAsyncThunk(PREVIEW_STUDENT_REQUESTED, async ({ student_id }) => {
    try {
        const response = await getStudentByStudentId({ id: student_id })
        return response
    } catch (err) {
        throw err
    }
})


export const previewStudentClassesRequested = createAsyncThunk(PREVIEW_STUDENT_CLASSES_REQUESTED, async () => {
    try {
        const response = await getAllClasses()
        return response
    } catch (err) {
        throw err
    }
})

export const studentVoucherRequested = createAsyncThunk(PREVIEW_STUDENT_VOUCHERS_REQUESTED, async ({ student_id }) => {
    try {
        const response = await getStudentVouchersApi({ student_id })
        return response
    } catch (err) {
        throw err
    }
})

const previewStudentSlice = createSlice({
    name: PREVIEW_STUDENT_SLICE_NAME,
    initialState: {
        studentId: null,
        studentDetail: {},
        studentAttachments: {},
        studentChallans: {},
        classesList: []
    },
    reducers: {
        handleChangePreviewStudentId: (state, action) => { state.studentId = action.payload }
    },
    extraReducers: builder => {
        builder.addCase(previewStudentRequested.fulfilled, (state, action) => {
            state.studentDetail = action.payload.data.student
        })
        builder.addCase(previewStudentClassesRequested.fulfilled, (state, action) => {
            state.classesList = action.payload.data.classes
        })
        builder.addCase(studentVoucherRequested.fulfilled, (state, action) => {
            state.studentChallans = action.payload.data.voucher
        })
    }
})


export const {
    handleChangePreviewStudentId
} = previewStudentSlice.actions


export const getStudentId = state => state.previewStudent.studentId
export const getStudentDetail = state => state.previewStudent.studentDetail
export const getStudentAttachments = state => state.previewStudent.studentAttachments
export const getStudentChallans = state => state.previewStudent.studentChallans
export const getClassesList = state => state.previewStudent.classesList

export default previewStudentSlice.reducer