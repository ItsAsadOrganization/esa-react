import { getTutorsApi, getTutortSalaryApi } from "../../api";
import { TUTORS_REQUESTED, TUTORS_SALARY_REQUESTED, TUTOR_SLICE_NAME } from "./constants";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const tutorsRequested = createAsyncThunk(TUTORS_REQUESTED, async () => {
    try {
        const response = await getTutorsApi()
        return response
    } catch (err) {
        throw err
    }
})

export const tutorsSalaryRequested = createAsyncThunk(TUTORS_SALARY_REQUESTED, async ({ id }) => {
    try {
        const response = await getTutortSalaryApi({ id })
        return response
    } catch (err) {
        throw err
    }
})

const tutorSlice = createSlice({
    name: TUTOR_SLICE_NAME,
    initialState: {
        tutorsList: [],
        tutorsModalOpen: false,
        id: null,
        salaryId: null,
        tutor: {
            name: "",
            email: "",
            contact: "",
            emergency_contact: "",
            address: "",
            joining_date: ""
        },
        salaryModelOpen: false,
        salary: 0,
        incrementValue: 0,
    },
    reducers: {
        handleChangeTutorId: (state, action) => { state.id = action.payload },
        handleChangeTutorName: (state, action) => { state.tutor.name = action.payload },
        handleChangeTutorEmail: (state, action) => { state.tutor.email = action.payload },
        handleChangeTutorContact: (state, action) => { state.tutor.contact = action.payload },
        handleChangeTutorEmergencyContact: (state, action) => { state.tutor.emergency_contact = action.payload },
        handleChangeTutorAddress: (state, action) => { state.tutor.address = action.payload },
        handleChangeTutorJoiningDate: (state, action) => { state.tutor.joining_date = action.payload },
        handleChangeTutorsModalOpen: (state, action) => { state.tutorsModalOpen = action.payload },

        handleChangeSalaryModelOpen: (state, action) => { state.salaryModelOpen = action.payload },
        handleChangeSalary: (state, action) => { state.salary = action.payload },
        handleChangeSalaryIncrementValue: (state, action) => { state.incrementValue = action.payload },

        handleChangeResetModel: state => {
            state.tutor.name = ""
            state.tutor.email = ""
            state.tutor.contact = ""
            state.tutor.emergency_contact = ""
            state.tutor.address = ""
            state.tutor.joining_date = ""
            state.tutorsModalOpen = false
        },
        handleResetSlice: (state) => {
            state.tutor.name = ""
            state.tutor.email = ""
            state.tutor.contact = ""
            state.tutor.emergency_contact = ""
            state.tutor.address = ""
            state.tutor.joining_date = ""
            state.tutorsModalOpen = false
            state.tutorsList = []
        }
    },
    extraReducers: builder => {
        builder.addCase(tutorsRequested.fulfilled, (state, action) => {
            state.tutorsList = action.payload.data.tutors
        })
        builder.addCase(tutorsSalaryRequested.fulfilled, (state, action) => {
            state.salary = action.payload.data.salary.salary
            state.salaryId = action.payload.data.salary.id
            state.incrementValue = action.payload.data.salary.incrementValue
        })
    }
})

export const {
    handleChangeTutorName,
    handleChangeTutorEmail,
    handleChangeTutorContact,
    handleChangeTutorEmergencyContact,
    handleChangeTutorAddress,
    handleChangeTutorJoiningDate,
    handleChangeTutorsModalOpen,
    handleChangeResetModel,
    handleResetSlice,
    handleChangeTutorId,
    handleChangeSalaryModelOpen,
    handleChangeSalary,
    handleChangeSalaryIncrementValue
} = tutorSlice.actions

export const getTutorsList = state => state.tutors.tutorsList
export const getTutorsModalOpen = state => state.tutors.tutorsModalOpen
export const getTutor = state => state.tutors.tutor
export const getTutorId = state => state.tutors.id
export const getSalaryModelOpen = state => state.tutors.salaryModelOpen
export const getSalary = state => state.tutors.salary
export const getSalaryIncrementValue = state => state.tutors.incrementValue
export const getSalaryID = state => state.tutors.salaryId

export default tutorSlice.reducer