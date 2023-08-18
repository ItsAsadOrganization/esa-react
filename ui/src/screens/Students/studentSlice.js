import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CLASSES_LIST_REQUESTED, STUDENTS_LIST_REQUESTED, STUDENTS_SLICE } from "./constants";
import { getAllClasses, getAllStudents } from "../../api";

export const studentsListRequested = createAsyncThunk(STUDENTS_LIST_REQUESTED, async () => {
    try {
        const response = await getAllStudents()
        return response
    } catch (err) {
        throw err
    }
})

export const classesRequested = createAsyncThunk(CLASSES_LIST_REQUESTED, async () => {
    try {
        const response = await getAllClasses()
        return response
    } catch (err) {
        throw err
    }
})

const studentSlice = createSlice({
    name: STUDENTS_SLICE,
    initialState: {
        studentList: [],
        classList: [],
        student: {
            id: null,
            name: "",
            father_name: "",
            email_address: "",
            phone_1: "",
            phone_2: "",
            phone_3: "",
            address: "",
            avatar: "",
            classId: null,
        },
        studentModalOpen: false
    },
    reducers: {
        handleChangeStudentId: (state, action) => { state.student.id = action.payload },
        handleChangeStudentName: (state, action) => { state.student.name = action.payload },
        handleChangeStudentFatherName: (state, action) => { state.student.father_name = action.payload },
        handleChangeStudentEmailAddress: (state, action) => { state.student.email_address = action.payload },
        handleChangeStudentPhone1: (state, action) => { state.student.phone_1 = action.payload },
        handleChangeStudentPhone2: (state, action) => { state.student.phone_2 = action.payload },
        handleChangeStudentPhone3: (state, action) => { state.student.phone_3 = action.payload },
        handleChangeStudentAddress: (state, action) => { state.student.address = action.payload },
        handleChangeStudentAvatar: (state, action) => { state.student.avatar = action.payload },
        handleChangeStudentClassId: (state, action) => {
            console.log(action.payload)
            state.student.classId = action.payload
        },
        handleChangeStudentModalOpen: (state, action) => {
            console.log("I am called")
            state.studentModalOpen = action.payload
        },
        handleResetStudentModal: (state) => {
            state.studentModalOpen = false
            state.student.id = null
            state.student.name = ""
            state.student.father_name = ""
            state.student.email_address = ""
            state.student.phone_1 = ""
            state.student.phone_2 = ""
            state.student.phone_3 = ""
            state.student.address = ""
            state.student.avatar = ""
            state.student.classId = null
        },
        handleResetSlice: (state) => {
            state.studentModalOpen = false
            state.student.id = null
            state.student.name = ""
            state.student.father_name = ""
            state.student.email_address = ""
            state.student.phone_1 = ""
            state.student.phone_2 = ""
            state.student.phone_3 = ""
            state.student.address = ""
            state.student.avatar = ""
            state.student.classId = null
            state.studentList = []
            state.classList = []
        }
    },
    extraReducers: builder => {
        builder.addCase(studentsListRequested.fulfilled, (state, action) => {
            state.studentList = action.payload.data.students
        })
        builder.addCase(classesRequested.fulfilled, (state, action) => {
            state.classList = action.payload.data.classes
        })
    }
})

export const {
    handleChangeStudentId,
    handleChangeStudentName,
    handleChangeStudentFatherName,
    handleChangeStudentEmailAddress,
    handleChangeStudentPhone1,
    handleChangeStudentPhone2,
    handleChangeStudentPhone3,
    handleChangeStudentAddress,
    handleChangeStudentAvatar,
    handleChangeStudentClassId,
    handleChangeStudentModalOpen,
    handleResetStudentModal,
    handleResetSlice
} = studentSlice.actions


export const getStudentId = state => state.student.student.id
export const getStudentName = state => state.student.student.name
export const getStudentFatherName = state => state.student.student.father_name
export const getStudentEmailAddress = state => state.student.student.email_address
export const getStudentPhone1 = state => state.student.student.phone_1
export const getStudentPhone2 = state => state.student.student.phone_2
export const getStudentPhone3 = state => state.student.student.phone_3
export const getStudentAddress = state => state.student.student.address
export const getStudentAvatar = state => state.student.student.avatar
export const getStudentClassId = state => state.student.student.classId
export const getStudentModalOpen = state => state.student.studentModalOpen
export const getStudenstList = state => state.student.studentList
export const getClassList = state => state.student.classList

export default studentSlice.reducer 