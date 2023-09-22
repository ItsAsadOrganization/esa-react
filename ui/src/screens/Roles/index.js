import React from "react"
import { getRolesApi } from "../../api"
import { Checkbox, Container, Fab, FormControlLabel, Grid, IconButton, Stack, Tooltip } from '@mui/material'
import AppBreadCrumbs from "../../components/BreadCrumbs"
import { BREADCRUMBS } from "./constants"
import ExplicitTable, { StyledTableCell, StyledTableRow } from "../../components/ExplicitTable"
import { openErrorToast } from "../../common/toast"
import { useDispatch, useSelector } from 'react-redux'
import { handleAddLoading, handleRemoveLoading } from "../../common/commonSlice"
import { getRolesList, rolesListRequested } from "./roleSlice"
import Icons from "../../common/icons"
import { useNavigate } from "react-router"
import { ROUTES } from "../../Layout/Navigation/constants"
import Dialog from "../../components/Dialog"
import { handleChangeSetupRoleId, handleChangeSetupRoleName, handleSetPermissions } from "../SetupRole/setupRolesSlice"

const Roles = () => {
    const dispatch = useDispatch()
    const rolesList = useSelector(getRolesList)

    const [previewRole, setPreviewRole] = React.useState({
        open: false,
        data: null
    })
    const loadRoles = async () => {
        try {
            dispatch(handleAddLoading())
            await dispatch(rolesListRequested()).unwrap()
            dispatch(handleRemoveLoading())
        } catch (err) {
            openErrorToast(err.message ? err.message : err)
        }
    }
    const navigate = useNavigate()

    const actionButtonArray = [
        {
            label: "Preview",
            icon: Icons.Visibility,
            color: "primary",
            size: "small",
            action: (role) => {
                setPreviewRole({
                    open: true,
                    data: role
                })
            }
        },
        {
            label: "Edit",
            icon: Icons.BorderColor,
            color: "secondary",
            size: "small",
            action: (role) => {
                dispatch(handleChangeSetupRoleId(role.id))
                dispatch(handleChangeSetupRoleName(role.name))
                dispatch(handleSetPermissions(role.permissions))
                navigate(`/${ROUTES.setupRole}`)
            }
        }
    ]
    React.useEffect(() => {
        loadRoles()
    }, [])
    return (
        <Container maxWidth="xl">
            <AppBreadCrumbs pageTitle={"Roles & Permissions"} paths={BREADCRUMBS} />
            <Grid container maxWidth="xl" >
                <Grid item xs={!2} md={12} sx={{
                    p: 2,
                    boxShadow: theme => theme.shadows[5],
                    background: theme => theme.palette.background.paper,
                    mb: 1
                }}>
                    <ExplicitTable tableSize="small" columns={[
                        { name: "Role Name" },
                        { name: "Parent Role" },
                        { name: "Actions", align: "right" },
                    ]}>
                        {rolesList.length > 0 ?
                            rolesList.map(role => (
                                <StyledTableRow>
                                    <StyledTableCell><b>{role.name.charAt(0).toUpperCase() + role.name.slice(1)}</b></StyledTableCell>
                                    <StyledTableCell><em>{role.name}</em></StyledTableCell>
                                    <StyledTableCell sx={{ textAlign: "right" }}> {
                                        actionButtonArray.map(btn => (
                                            <Tooltip placement="top" title={btn.label}>
                                                <IconButton key={btn.label} onClick={() => btn.action(role)}>
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
                    onClick={() => { navigate(`/${ROUTES.setupRole}`) }}
                    color="primary"
                    sx={{
                        position: "absolute",
                        right: 50,
                        bottom: 50
                    }}>
                    <Icons.Add />
                </Fab>
            </Tooltip>

            <Dialog dailogOpen={previewRole.open && previewRole.data} size={"sm"} hasCloseIcon={true}
                title={`${previewRole.data?.name.charAt(0).toUpperCase() + previewRole.data?.name.slice(1)} Privileges`}
                handleClose={() => {
                    setPreviewRole({
                        open: false,
                        data: null
                    })
                }}
            >
                <ExplicitTable columns={[{ name: "Page" }, { name: "Permissions" }]}>
                    {previewRole.data?.permissions.map((per, pageIndex) => (
                        <StyledTableRow>
                            <StyledTableCell sx={{ width: "40%", verticalAlign: 'text-top' }}>{per.page}</StyledTableCell>
                            <StyledTableCell>
                                <Stack sx={{
                                    flex: ' 0 0 50%'
                                }}>
                                    <FormControlLabel
                                        label="All"

                                        control={
                                            <Checkbox
                                                sx={{
                                                    padding: '3px !important'
                                                }}
                                                checked={per.permissions.filter(p => p.checked).length === per.permissions.length}
                                                indeterminate={per.permissions.filter(p => p.checked).length > 0 && per.permissions.filter(p => p.checked).length !== per.permissions.length}
                                            />
                                        }
                                    />
                                    {per.permissions.map((pp, permissionIndex) => (
                                        <FormControlLabel
                                            sx={{ ml: 1.5 }}
                                            label={pp.label}
                                            value={pp.permission}
                                            control={
                                                <Checkbox
                                                    sx={{
                                                        padding: '3px !important'
                                                    }}
                                                    checked={pp.checked}
                                                />
                                            }
                                        />
                                    ))}
                                </Stack>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}

                </ExplicitTable>
            </Dialog>
        </Container>
    )
}

export default Roles