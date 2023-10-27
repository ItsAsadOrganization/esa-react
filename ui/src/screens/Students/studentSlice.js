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
        classSearchList: [],
        classSearch: [],
        cnicSearch: '',
        nameSearch: '',
        dateStart: null,
        dateEnd: null,
        contactSearch: null,
        student: {
            id: null,
            name: "",
            father_name: "",
            email_address: "",
            phone_1: "",
            phone_2: "",
            phone_3: "",
            address: "",
            gender: "male",
            avatar: null,
            classId: null,
            fatther_nic: "",
            cnic: ""
        },
        studentModalOpen: false,
        queryModalOpen: false
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
        handleChangeStudentFatherCNIC: (state, action) => { state.student.fatther_nic = action.payload },
        handleChangeStudentCNIC: (state, action) => { state.student.cnic = action.payload },
        handleChangeStudentGender: (state, action) => { state.student.gender = action.payload },


        handleChangeCnicSearch: (state, action) => { state.cnicSearch = action.payload },
        handleChangeContactSearch: (state, action) => { state.contactSearch = action.payload },

        handleChangeDateStart: (state, action) => { state.dateStart = action.payload },
        handleChangeDateEnd: (state, action) => { state.dateEnd = action.payload },

        handleChangeNameSearch: (state, action) => { state.nameSearch = action.payload },
        handleChangeClassSearch: (state, action) => {
            if (action.payload.type === "all") {
                state.classSearchList = state.classSearchList.map(cls => ({ ...cls, selected: action.payload.selected }))
            } else {
                state.classSearchList[action.payload.index].selected = action.payload.selected
            }
            state.classSearch = [...new Set(state.classSearchList.filter(cls => cls.selected).map(cls => cls.name))]
        },

        handleChangeQueryModalOpen: (state, action) => { state.queryModalOpen = action.payload },
        handleChangeStudentClassId: (state, action) => {
            state.student.classId = action.payload
        },
        handleChangeStudentModalOpen: (state, action) => {
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
            state.student.avatar = null
            state.student.fatther_nic = ""
            state.student.cnic = ""
            state.student.classId = null
            state.student.gender = 'male'
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
            state.student.avatar = null
            state.student.fatther_nic = ""
            state.student.cnic = ""
            state.student.gender = "male"
            state.student.classId = null
            state.studentList = []
            state.classList = []
            state.queryModalOpen = false
            state.dateEnd = null
            state.dateStart = null
            state.contactSearch = null
        }
    },
    extraReducers: builder => {
        builder.addCase(studentsListRequested.fulfilled, (state, action) => {
            state.studentList = action.payload.data.students
        })
        builder.addCase(classesRequested.fulfilled, (state, action) => {
            state.classList = action.payload.data.classes
            state.classSearchList = action.payload.data.classes.map(cls => ({ name: cls.name, id: cls.id, selected: true }))
            state.classSearch = [...new Set(action.payload.data.classes.map(cls => cls.name))]
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
    handleResetSlice,
    handleChangeStudentFatherCNIC,
    handleChangeStudentCNIC,
    handleChangeQueryModalOpen,
    handleChangeCnicSearch,
    handleChangeNameSearch,
    handleChangeClassSearch,
    handleChangeStudentGender,
    handleChangeDateStart,
    handleChangeDateEnd,
    handleChangeContactSearch
} = studentSlice.actions


export const getStudentId = state => state.student.student.id
export const getStudentName = state => state.student.student.name
export const getStudentFatherName = state => state.student.student.father_name

export const getStudentFatherCNIC = state => state.student.student.fatther_nic
export const getStudentCNIC = state => state.student.student.cnic

export const getStudentEmailAddress = state => state.student.student.email_address
export const getStudentPhone1 = state => state.student.student.phone_1
export const getStudentPhone2 = state => state.student.student.phone_2
export const getStudentPhone3 = state => state.student.student.phone_3
export const getStudentAddress = state => state.student.student.address
export const getStudentAvatar = state => state.student.student.avatar

export const getStudentGender = state => state.student.student.gender

export const getStudentClassId = state => state.student.student.classId
export const getStudentModalOpen = state => state.student.studentModalOpen
export const getStudenstList = state => state.student.studentList
export const getClassList = state => state.student.classList
export const getQueryModalOpen = state => state.student.queryModalOpen
export const getClassSearchList = state => state.student.classSearchList
export const getCnicSearch = state => state.student.cnicSearch
export const getNameSearch = state => state.student.nameSearch
export const getClassSearch = state => state.student.classSearch
export const getDateStart = state => state.student.dateStart
export const getDateEnd = state => state.student.dateEnd
export const getContactSearch = state => state.student.contactSearch

export default studentSlice.reducer 