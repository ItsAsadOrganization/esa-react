import { createSlice } from '@reduxjs/toolkit'
import { Permissions, SETUP_ROLES_SLICE_NAME } from './constants'

const setupRolesSlice = createSlice({
    name: SETUP_ROLES_SLICE_NAME,
    initialState: {
        name: "",
        permissions: Permissions
    },
    reducers: {
        handleChangeSetupRoleName: (state, action) => { state.name = action.payload },
        handleChangeSetupRolePermission: (state, action) => {
            console.log(action.payload)
            if (action.payload.action === "all") {
                state.permissions[action.payload.pageIndex].permissions = state.permissions[action.payload.pageIndex].permissions.map(p => ({ ...p, checked: action.payload.checked }))
            } else {
                state.permissions[action.payload.pageIndex].permissions[action.payload.permissionIndex].checked = action.payload.checked
            }
        }
    },
    extraReducers: builder => {

    }
})

export const {
    handleChangeSetupRoleName,
    handleChangeSetupRolePermission
} = setupRolesSlice.actions

export const getSetupRoleName = state => state.setupRole.name
export const getSetupRolePermissions = state => state.setupRole.permissions

export default setupRolesSlice.reducer