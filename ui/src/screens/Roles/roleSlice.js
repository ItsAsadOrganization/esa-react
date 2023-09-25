import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ROLES_LIST_REQUESTED, ROLE_SLICE_NAME } from "./constants";
import { getRolesApi } from "../../api";

export const rolesListRequested = createAsyncThunk(ROLES_LIST_REQUESTED, async () => {
    try {
        const response = await getRolesApi()
        return response
    } catch (err) {
        throw err
    }
})

const rolesSlice = createSlice({
    name: ROLE_SLICE_NAME,
    initialState: {
        rolesList: []
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(rolesListRequested.fulfilled, (state, action) => {
            state.rolesList = action.payload.data.roles
        })
    }
})

export const { } = rolesSlice.actions

export const getRolesList = state => state.role.rolesList

export default rolesSlice.reducer