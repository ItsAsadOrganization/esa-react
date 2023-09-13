import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { QUERIES_LIST_REQUESTED, QUERY_SLICE, STUDENT_QUERIES_REQUESTED } from "./constants";
import { getAllStudents, getQueriesApi, getQueryApi, getTutorsApi } from "../../api";

export const queriesRequested = createAsyncThunk(QUERIES_LIST_REQUESTED, async () => {
    try {
        const students = await getAllStudents()
        const queries = await getQueriesApi()
        const tutors = await getTutorsApi()
        return {
            students, queries, tutors
        }
    } catch (err) {
        throw err
    }
})
export const studentQueriesRequested = createAsyncThunk(STUDENT_QUERIES_REQUESTED, async ({ studentId }) => {
    try {
        const response = await getQueryApi({ id: studentId })
        return response
    } catch (err) {
        throw err
    }
})

const querySlice = createSlice({
    name: QUERY_SLICE,
    initialState: {
        studentsList: [],
        queriesList: [],
        queryDetails: [],
        tutorsList: [],
        studentId: null,
        comment: "",
        followUp: null,
        contact_medium: null,
    },
    reducers: {
        handleChangeStudentId: (state, action) => { state.studentId = action.payload },
        handleChangeComment: (state, action) => { state.comment = action.payload },
        handleChangeFollowUp: (state, action) => { state.followUp = action.payload },
        handleChangeContactMedium: (state, action) => { state.contact_medium = action.payload },
        handleResetForm: (state) => {
            state.comment = ""
            state.followUp = ""
            state.contact_medium = ""
        },
    },
    extraReducers: builder => {
        builder.addCase(queriesRequested.fulfilled, (state, action) => {
            state.queriesList = action.payload.students.data.students.filter(std => std.enrolled === false)
            state.studentId = action.payload.students.data.students.filter(std => std.enrolled === false)[0].id
            state.tutorsList = action.payload.tutors.data.tutors
        })
        builder.addCase(studentQueriesRequested.fulfilled, (state, action) => {
            state.queryDetails = action.payload.data.query
        })
    }
})

export const {
    handleChangeStudentId,
    handleChangeComment,
    handleChangeFollowUp,
    handleChangeContactMedium,
    handleResetForm
} = querySlice.actions


export const getStudentId = state => state.queries.studentId
export const getComment = state => state.queries.comment
export const getFollowUp = state => state.queries.followUp
export const getContactMedium = state => state.queries.contact_medium
export const getQueryDetails = state => state.queries.queryDetails
export const getQueriesList = state => state.queries.queriesList
export const getStudentsList = state => state.queries.studentsList
export const getTutorsList = state => state.queries.tutorsList

export default querySlice.reducer