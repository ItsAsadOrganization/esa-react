import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CLASSES_LIST_REQUESTED, CLASS_SLICE } from "./constants";
import { getAllClasses } from "../../api";


export const classesRequested = createAsyncThunk(CLASSES_LIST_REQUESTED, async () => {
    try {
        const response = await getAllClasses()
        return response
    } catch (err) {
        throw err
    }
})

const classSlice = createSlice({
    name: CLASS_SLICE,
    initialState: {
        classesList: [],
        class: {
            id: null,
            name: ""
        },
        classModalOpen: false
    },
    reducers: {
        handleChangeClassId: (state, action) => { state.class.id = action.payload },
        handleChangeClassName: (state, action) => { state.class.name = action.payload },
        handleChangeClassModalOpen: (state, action) => { state.classModalOpen = action.payload },
        handleResetClassModal: (state) => {
            state.classModalOpen = false
            state.class.id = null
            state.class.name = ""
        },
        handleResetClassSlice: (state) => {
            state.classModalOpen = false
            state.class.id = null
            state.class.name = ""
            state.classesList = []
        }
    },
    extraReducers: builder => {
        builder.addCase(classesRequested.fulfilled, (state, action) => {
            state.classesList = action.payload.data.classes
        })
    }
})

export const {
    handleChangeClassId,
    handleChangeClassName,
    handleChangeClassModalOpen,
    handleResetClassModal,
    handleResetClassSlice
} = classSlice.actions


export const getClass = state => state.classes.class
export const getClassList = state => state.classes.classesList
export const getClassModelOpen = state => state.classes.classModalOpen


export default classSlice.reducer