
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { USERS_LIST_REQUESTED, USERS_SLICE_NAME } from "./constants";
import { getRolesApi, getUsersApi } from "../../api";

export const usersListRequested = createAsyncThunk(USERS_LIST_REQUESTED, async () => {
    try {
        const response = await getRolesApi()
        const users = await getUsersApi()
        return {
            roles: response,
            users
        }
    } catch (err) {
        throw err
    }
})

const usersSlice = createSlice({
    name: USERS_SLICE_NAME,
    initialState: {
        usersList: [],
        rolesList: [],
        userId: null,
        user: {
            name: "",
            email: "",
            roleId: null,
            password: ""
        }
    },
    reducers: {
        handleChangeUserId: (state, action) => { state.userId = action.payload },
        handleChangeUserDetail: (state, action) => { state.user[action.payload.key] = action.payload.value },
        handlResetForm: (state) => {
            state.userId = null
            state.user = {
                name: "",
                email: "",
                roleId: null,
                password: ""
            }
        },
        handlResetUserSlice: (state) => {
            state.usersList = []
            state.rolesList = []
            state.userId = null
            state.user = {
                name: "",
                email: "",
                roleId: null,
                password: ""
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(usersListRequested.fulfilled, (state, action) => {
            state.usersList = action.payload.users.data.users
            state.rolesList = action.payload.roles.data.roles
        })
    }
})

export const {
    handleChangeUserId,
    handleChangeUserDetail,
    handlResetForm,
    handlResetUserSlice
} = usersSlice.actions

export const getUsersList = state => state.users.usersList
export const getRolesList = state => state.users.rolesList
export const getAddUser = state => state.users.user
export const getAddUserId = state => state.users.userId

export default usersSlice.reducer
