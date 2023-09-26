import { Container, Fab, Grid, IconButton, MenuItem, TextField, Tooltip } from "@mui/material"
import AppBreadCrumbs from "../../components/BreadCrumbs"
import { BREADCRUMBS } from "./constants"
import ExplicitTable, { StyledTableCell, StyledTableRow } from "../../components/ExplicitTable"
import { useDispatch, useSelector } from "react-redux"
import React from "react"
import { openErrorToast } from "../../common/toast"
import { handleAddLoading, handleRemoveLoading } from "../../common/commonSlice"
import { getAddUser, getAddUserId, getRolesList, getUsersList, handleChangeUserDetail, handleChangeUserId, usersListRequested } from "./usersSlice"
import Icons from "../../common/icons"
import Dialog from "../../components/Dialog"
import { handlResetForm } from './usersSlice'
import { delUserInfoApi, postUserInfoApi, putUserInfoApi, putUserPwdApi } from "../../api"

const Users = () => {

    const dispatch = useDispatch()
    const usersList = useSelector(getUsersList)
    const rolesList = useSelector(getRolesList)
    const userinfo = useSelector(getAddUser)
    const uId = useSelector(getAddUserId)

    const [modal, setModal] = React.useState({
        open: false,
        action: ""
    })

    const [vtype, setVtype] = React.useState(false)


    const [password, setPassword] = React.useState({
        pwd: "",
        newPwd: ""
    })


    const handleChangePassword = () => {
        if (password.pwd === password.newPwd) {
            dispatch(handleChangeUserDetail({
                key: "password",
                value: password.pwd
            }))
        }
    }


    React.useEffect(() => {
        handleChangePassword()
    }, [password.pwd, password.newPwd])


    const loadUsers = async () => {
        try {
            dispatch(handleAddLoading())
            await dispatch(usersListRequested()).unwrap()
            dispatch(handleRemoveLoading())
        } catch (err) {
            openErrorToast(err)
        }
    }
    React.useEffect(() => {
        loadUsers()
    }, [])

    const actionButtonArray = [
        {
            label: "Change Password",
            icon: Icons.Lock,
            color: "primary",
            size: "small",
            action: (user) => {
                dispatch(handleChangeUserId(user.id))
                setModal({
                    open: true,
                    action: "chpw"
                })
            }
        },
        {
            label: "Edit",
            icon: Icons.BorderColor,
            color: "secondary",
            size: "small",
            action: (user) => {
                dispatch(handleChangeUserDetail({
                    key: "name",
                    value: user.name
                }))

                dispatch(handleChangeUserDetail({
                    key: "email",
                    value: user.email
                }))

                dispatch(handleChangeUserDetail({
                    key: "roleId",
                    value: user.roleId
                }))

                dispatch(handleChangeUserId(user.id))
                setModal({
                    open: true,
                    action: "edit"
                })
            }
        },
        {
            label: "Delete",
            icon: Icons.Delete,
            color: "error",
            size: "small",
            action: async (user) => {
                try {
                    dispatch(handleAddLoading())
                    await delUserInfoApi({ id: user.id })
                    loadUsers()
                    dispatch(handleRemoveLoading())
                } catch (err) {
                    dispatch(handleRemoveLoading())
                    openErrorToast(err.message ? err.message : err)
                }
            }
        }
    ]

    return (
        <Container maxWidth="xl">
            <AppBreadCrumbs pageTitle={"System Users"} paths={BREADCRUMBS} />
            <Grid container maxWidth="xl" >
                <Grid item xs={!2} md={12} sx={{
                    p: 2,
                    boxShadow: theme => theme.shadows[5],
                    background: theme => theme.palette.background.paper,
                    mb: 1
                }}>
                    <ExplicitTable tableSize="small" columns={[
                        { name: "Name" },
                        { name: "Email" },
                        { name: "Role" },
                        { name: "Has Access" },
                        { name: "Actions", align: "right" },
                    ]}>
                        {usersList.length > 0 ?
                            usersList.filter(u => u.name !== "superadmin").map(user => (
                                <StyledTableRow key={user.id}>
                                    <StyledTableCell>{user.name}</StyledTableCell>
                                    <StyledTableCell>{user.email}</StyledTableCell>
                                    <StyledTableCell>{user["role.name"]}</StyledTableCell>
                                    <StyledTableCell>{user.deletedAt ? "In Active" : "Active"}</StyledTableCell>
                                    <StyledTableCell sx={{ textAlign: "right" }}> {
                                        actionButtonArray.map(btn => (
                                            <Tooltip placement="top" title={btn.label}>
                                                <IconButton key={btn.label} onClick={() => btn.action(user)}>
                                                    <btn.icon color={btn.color} />
                                                </IconButton>
                                            </Tooltip>
                                        ))
                                    } </StyledTableCell>
                                </StyledTableRow>
                            ))
                            : ""}
                    </ExplicitTable>
                </Grid>
            </Grid>

            <Tooltip placement="top" title="Add New">
                <Fab
                    onClick={() => {
                        setModal({
                            open: true,
                            action: "add"
                        })
                    }}
                    sx={{
                        position: "absolute",
                        bottom: 50,
                        right: 50
                    }} color="primary">
                    <Icons.Add />
                </Fab>
            </Tooltip>

            <Dialog clickAwayListener={false} dailogOpen={modal.open && modal.action} size={"sm"} title={modal.action === "add" ? "Add New" : "Update"} hasCloseIcon={true} handleClose={() => {
                dispatch(handlResetForm())
                setModal({
                    open: false,
                    action: ""
                })
                setPassword({
                    pwd: "",
                    newPwd: ""
                })
            }}
                actionsButtonArray={[{
                    label: "Save",
                    variant: "contained",
                    size: "small",
                    color: "primary",
                    disabled: modal.action === "add" && (!password.pwd || !password.newPwd) || (password.pwd !== password.newPwd),
                    action: async () => {
                        try {
                            dispatch(handleAddLoading())
                            if (modal.action === "add") {
                                await postUserInfoApi({
                                    name: userinfo.name,
                                    email: userinfo.email,
                                    password: userinfo.password,
                                    roleId: userinfo.roleId
                                })
                            } else if (modal.action === "edit") {
                                await putUserInfoApi({
                                    name: userinfo.name,
                                    email: userinfo.email,
                                    roleId: userinfo.roleId,
                                    id: uId
                                })
                            } else if (modal.action === "chpw") {
                                await putUserPwdApi({
                                    password: userinfo.password,
                                    id: uId
                                })
                            }

                            await dispatch(usersListRequested()).unwrap()
                            dispatch(handlResetForm())
                            setModal({
                                open: false,
                                action: ""
                            })
                            setPassword({
                                pwd: "",
                                newPwd: ""
                            })
                            dispatch(handleRemoveLoading())
                        } catch (err) {
                            openErrorToast(err)
                        }
                    }
                }]}
            >
                <Grid container rowGap={2}>
                    {(uId === null || modal.action === "edit") && <>
                        <Grid item xs={12}>
                            <TextField
                                error={!userinfo.name}
                                helperText={!userinfo.name ? "Required Field" : ""}
                                fullWidth size="small" label="Name" value={userinfo.name} onChange={(e) => {
                                    dispatch(handleChangeUserDetail({
                                        key: "name",
                                        value: e.target.value
                                    }))
                                }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={!userinfo.email}
                                helperText={!userinfo.email ? "Required Field" : ""}
                                fullWidth size="small" label="Email Address" value={userinfo.email} onChange={(e) => {
                                    dispatch(handleChangeUserDetail({
                                        key: "email",
                                        value: e.target.value
                                    }))
                                }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={!userinfo.roleId}
                                helperText={!userinfo.roleId ? "Required Field" : ""}
                                fullWidth size="small" label="Role" select value={userinfo.roleId ? userinfo.roleId : ""} onChange={(e) => {
                                    dispatch(handleChangeUserDetail({
                                        key: "roleId",
                                        value: e.target.value
                                    }))
                                }} >
                                {rolesList.length > 0 ?
                                    rolesList.filter(r => r.name !== "superadmin").map(role => (
                                        <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                                    ))
                                    : ""}
                            </TextField>
                        </Grid>
                    </>}

                    {(uId === null || modal.action === "chpw") &&
                        <Grid item xs={12}>
                            <TextField
                                type={!vtype ? "password" : "text"}
                                InputProps={{
                                    endAdornment: <IconButton onClick={() => setVtype(!vtype)}>
                                        {!vtype ? <Icons.Visibility /> : <Icons.VisibilityOff />}
                                    </IconButton>
                                }}
                                error={(!password.pwd || !password.newPwd) || (password.pwd !== password.newPwd)}
                                helperText={(!password.pwd || !password.newPwd) || (password.pwd !== password.newPwd) ? "Password Mismatch" : ""}
                                fullWidth size="small" label="Password" value={password.pwd} onChange={(e) => {
                                    setPassword({ ...password, pwd: e.target.value })
                                }} />
                        </Grid>
                    }

                    {(uId === null || modal.action === "chpw") &&
                        <Grid item xs={12}>
                            <TextField
                                type={!vtype ? "password" : "text"}
                                InputProps={{
                                    endAdornment: <IconButton onClick={() => setVtype(!vtype)}>
                                        {!vtype ? <Icons.Visibility /> : <Icons.VisibilityOff />}
                                    </IconButton>
                                }}
                                error={(!password.pwd || !password.newPwd) || (password.pwd !== password.newPwd)}
                                helperText={(!password.pwd || !password.newPwd) || (password.pwd !== password.newPwd) ? "Password Mismatch" : ""}
                                fullWidth size="small" label="Confirm Password" value={password.newPwd} onChange={(e) => {
                                    setPassword({ ...password, newPwd: e.target.value })
                                }} />
                        </Grid>}

                </Grid>
            </Dialog>
        </Container>
    )
}

export default Users