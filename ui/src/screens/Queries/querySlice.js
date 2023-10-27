import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { QUERIES_LIST_REQUESTED, QUERIES_SLICE_NAME } from "./constants";
import { getQueriesApi } from "../../api";


export const queryiesListRequested = createAsyncThunk(QUERIES_LIST_REQUESTED, async ({ userId = null }) => {
    try {
        const response = await getQueriesApi({ id: userId })
        return response
    } catch (err) {
        throw err
    }
})


const querySlice = createSlice({
    name: QUERIES_SLICE_NAME,
    initialState: {
        queriesList: [],
        queryModalOpen: false,
        queryStudentName: "",
        queryStudentPhone: "",
        queryForm: {
            comment: "",
            followUpDate: null,
            contact_medium: "",
            code: ""
        },
        queryConfig: {},
        queryStdId: null
    },
    reducers: {
        handleChangeQueryStudentName: (state, action) => { state.queryStudentName = action.payload },
        handleChangeQueryStudentPhone: (state, action) => { state.queryStudentPhone = action.payload },
        handleChangeQueryModalOpen: (state, action) => { state.queryModalOpen = action.payload },
        handleChangeQueryFormCode: (state, action) => { state.queryForm.code = action.payload },
        handleChangeQueryFormComment: (state, action) => { state.queryForm.comment = action.payload },
        handleChangeQueryFormFollowUpDate: (state, action) => { state.queryForm.followUpDate = action.payload },
        handleChangeQueryFormContactMedium: (state, action) => { state.queryForm.contact_medium = action.payload },
        handleChangeQueryConfig: (state, action) => { state.queryConfig = action.payload },
        handleChangeQueryStdId: (state, action) => { state.queryStdId = action.payload },
        handleResetQueryModal: (state) => {
            state.queryModalOpen = false
            state.queryStdId = null
            state.queryForm = {
                comment: "",
                followUpDate: null,
                contact_medium: "",
                code: ""
            }
        },
        handleResetQuerySlice: (state) => {
            state.queryModalOpen = false
            state.queriesList = []
            state.queryStdId = null
            state.queryConfig = {}
            state.queryForm = {
                comment: "",
                followUpDate: null,
                contact_medium: "",
                code: ""
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(queryiesListRequested.fulfilled, (state, action) => {
            state.queriesList = action.payload.data.queries.sort((a, b) => {
                return new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ? -1 : 1
            })
        })
    }
})

export const {
    handleChangeQueryModalOpen,
    handleChangeQueryFormComment,
    handleChangeQueryFormFollowUpDate,
    handleChangeQueryFormContactMedium,
    handleChangeQueryConfig,
    handleChangeQueryStdId,
    handleResetQueryModal,
    handleResetQuerySlice,
    handleChangeQueryStudentName,
    handleChangeQueryStudentPhone,
    handleChangeQueryFormCode
} = querySlice.actions


export const getQueriesList = state => state.queries.queriesList
export const getQueryModalOpen = state => state.queries.queryModalOpen
export const getQueryForm = state => state.queries.queryForm
export const getQueryConfig = state => state.queries.queryConfig
export const getQueryStdId = state => state.queries.queryStdId
export const getQueryStudentName = state => state.queries.queryStudentName
export const getQueryStudentPhone = state => state.queries.queryStudentPhone

export default querySlice.reducer