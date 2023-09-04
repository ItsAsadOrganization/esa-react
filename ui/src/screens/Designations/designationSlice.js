import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DESIGNATIONS_REQUESTED, DESIGNATION_SLICE_NAME } from "./constants";
import { getDesignationsApi } from "../../api";

export const designationsRequested = createAsyncThunk(DESIGNATIONS_REQUESTED, async() => {
    try {
        const response = await getDesignationsApi()
        return response
    } catch (err) {
        throw err
    }
})


const designationSlice = createSlice({
    name: DESIGNATION_SLICE_NAME,
    initialState: {
        id: null,
        name: "",
        designaitonModalOpen: false,
        designationsList: []
    },
    reducers: {
        handleChangeDesignationId: (state, action) => { state.id = action.payload },
        handleChangeDesignationName: (state, action) => { state.name = action.payload },
        handleChangeDesignationModalOpen: (state, action) => { state.designaitonModalOpen = action.payload },
        handleResetDesignationModal: (state) => {
            state.id = null
            state.name = ""
            state.designaitonModalOpen = false
        }
    },
    extraReducers: builder => { 
        builder.addCase(designationsRequested.fulfilled,(state, action) => {
            state.designationsList = action.payload.data.designations
        })
    }
})

export const {
    handleChangeDesignationId,
    handleChangeDesignationName,
    handleChangeDesignationModalOpen,
    handleResetDesignationModal
} = designationSlice.actions

export const getDesignationId = state => state.designations.id
export const getDesignationName = state => state.designations.name
export const getDesignationModalOpen = state => state.designations.designaitonModalOpen
export const getDesignationList = state => state.designations.designationsList

export default designationSlice.reducer