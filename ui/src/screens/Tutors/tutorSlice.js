import { getDesignationsApi, getTutorsApi, getTutortSalaryApi } from "../../api";
import { TUTORS_REQUESTED, TUTORS_SALARY_REQUESTED, TUTOR_SLICE_NAME } from "./constants";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const tutorsRequested = createAsyncThunk(TUTORS_REQUESTED, async () => {
    try {
        const response = await getTutorsApi()
        const designations = await getDesignationsApi()
        return {
            designations,
            tutors: response
        }
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
        designationsList: [],
        tutor: {
            name: "",
            email: "",
            contact: "",
            emergency_contact: "",
            address: "",
            joining_date: "",
            cnic: "",
            designationId: ""
        },
        salaryModelOpen: false,
        salary: {
            payments: {
                basic_salary: 0,
                home_allowence: 0,
                utility_allowence: 0,
                increment: 0,
                bonus: 0,
                encashment: 0
            },
            deductions: {
                icome_tax: 0,
                late_arrivals: { days: 0, amount: 0 },
                unpaid_leaves: { days: 0, amount: 0 }
            }
        }
    },
    reducers: {
        handleChangeTutorId: (state, action) => { state.id = action.payload },
        handleChangeTutorName: (state, action) => { state.tutor.name = action.payload },
        handleChangeTutorEmail: (state, action) => { state.tutor.email = action.payload },
        handleChangeTutorContact: (state, action) => { state.tutor.contact = action.payload },
        handleChangeTutorEmergencyContact: (state, action) => { state.tutor.emergency_contact = action.payload },
        handleChangeTutorAddress: (state, action) => { state.tutor.address = action.payload },
        handleChangeTutorJoiningDate: (state, action) => { state.tutor.joining_date = action.payload },
        handleChangeTutorCNIC: (state, action) => { state.tutor.cnic = action.payload },
        handleChangeTutorDesignationIs: (state, action) => { state.tutor.designationId = action.payload },

        handleChangeTutorsModalOpen: (state, action) => { state.tutorsModalOpen = action.payload },

        handleChangeSalaryModelOpen: (state, action) => { state.salaryModelOpen = action.payload },

        handleChangeSalary: (state, action) => { state.salary.payments[action.payload.key] = parseFloat(action.payload.value) },

        handleChangeResetModel: state => {
            state.tutor.name = ""
            state.tutor.email = ""
            state.tutor.contact = ""
            state.tutor.emergency_contact = ""
            state.tutor.address = ""
            state.tutor.joining_date = ""
            state.tutor.cnic = ""
            state.tutor.designationId = ""
            state.id = null
            state.tutorsModalOpen = false
        },
        handleResetSalaryModel: state => {
            state.salary.payments.basic_salary = 0
            state.salary.payments.home_allowence = 0
            state.salary.payments.utility_allowence = 0
            state.salary.payments.increment = 0
            state.salary.payments.bonus = 0
            state.salary.payments.encashment = 0
            state.salary.deductions.icome_tax = 0
            state.salary.deductions.late_arrivals.days = 0
            state.salary.deductions.late_arrivals.amount = 0
            state.salary.deductions.unpaid_leaves.days = 0
            state.salary.deductions.unpaid_leaves.amount = 0
            state.id = null
            state.salaryModelOpen = false
            state.salaryId = null
        },
        handleResetSlice: (state) => {
            state.tutor.name = ""
            state.tutor.email = ""
            state.tutor.contact = ""
            state.tutor.emergency_contact = ""
            state.tutor.address = ""
            state.tutor.joining_date = ""
            state.tutorsModalOpen = false
            state.tutor.cnic = ""
            state.tutor.designationId = ""
            state.tutorsList = []
            state.designationsList = []
        }
    },
    extraReducers: builder => {
        builder.addCase(tutorsRequested.fulfilled, (state, action) => {
            state.tutorsList = action.payload.tutors.data.tutors
            state.designationsList = action.payload.designations.data.designations
        })
        builder.addCase(tutorsSalaryRequested.fulfilled, (state, action) => {
            if (action.payload.data.salary) {
                state.salary = action.payload.data.salary.salary
                state.salaryId = action.payload.data.salary.id
            }
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
    handleChangeTutorCNIC,
    handleChangeTutorDesignationIs,
    handleResetSalaryModel
} = tutorSlice.actions

export const getTutorsList = state => state.tutors.tutorsList
export const getTutorsModalOpen = state => state.tutors.tutorsModalOpen
export const getTutor = state => state.tutors.tutor
export const getTutorId = state => state.tutors.id
export const getSalaryModelOpen = state => state.tutors.salaryModelOpen
export const getSalary = state => state.tutors.salary
export const getSalaryID = state => state.tutors.salaryId
export const getDesignationsList = state => state.tutors.designationsList

export default tutorSlice.reducer