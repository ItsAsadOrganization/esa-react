import { createSlice } from '@reduxjs/toolkit'
import { Permissions, SETUP_ROLES_SLICE_NAME } from './constants'

const setupRolesSlice = createSlice({
    name: SETUP_ROLES_SLICE_NAME,
    initialState: {
        name: "",
        permissions: Permissions,
        roleId: null
    },
    reducers: {
        handleChangeSetupRoleId: (state, action) => { state.roleId = action.payload },
        handleChangeSetupRoleName: (state, action) => { state.name = action.payload },
        handleChangeSetupRolePermission: (state, action) => {
            if (action.payload.action === "all") {
                state.permissions[action.payload.pageIndex].permissions = state.permissions[action.payload.pageIndex].permissions.map(p => ({ ...p, checked: action.payload.checked }))
            } else {
                state.permissions[action.payload.pageIndex].permissions[action.payload.permissionIndex].checked = action.payload.checked
            }
        },
        handleSetPermissions:(state, action) => {state.permissions = action.payload},
        handleResetSlice: (state) => {
            state.name = ""
            state.permissions = Permissions
            state.roleId = null
        }
    },
    extraReducers: builder => {

    }
})

export const {
    handleChangeSetupRoleName,
    handleChangeSetupRolePermission,
    handleChangeSetupRoleId,
    handleResetSlice,
    handleSetPermissions
} = setupRolesSlice.actions

export const getSetupRoleName = state => state.setupRole.name
export const getSetupRolePermissions = state => state.setupRole.permissions
export const getSetupRoleID = state => state.setupRole.roleId

export default setupRolesSlice.reducer