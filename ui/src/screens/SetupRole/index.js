import { Container, Button, Grid, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, FormLabel, FormControlLabel, Checkbox, Stack } from "@mui/material"
import ExplicitTable, { StyledTableCell, StyledTableRow } from "../../components/ExplicitTable"
import { Permissions } from "./constants"
import { getSetupRoleName, getSetupRolePermissions, handleChangeSetupRoleName, handleChangeSetupRolePermission, handleResetSlice, getSetupRoleID } from "./setupRolesSlice"
import { useDispatch, useSelector } from 'react-redux'
import { openErrorToast } from "../../common/toast"
import { postRoleApi, putRoleApi } from "../../api"
import { useNavigate } from 'react-router-dom'
import { ROUTES } from "../../Layout/Navigation/constants"
import React from "react"

const SetupRole = () => {

    const roleId = useSelector(getSetupRoleID)
    const name = useSelector(getSetupRoleName)
    const rolePermissions = useSelector(getSetupRolePermissions)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    React.useEffect(() => {
        return () => {
            dispatch(handleResetSlice())
        }
    }, [])
    return (
        <Container maxWidth="xl">
            <Grid container maxWidth="xl" sx={{
                p: 2,
                boxShadow: theme => theme.shadows[5],
                background: theme => theme.palette.background.paper,
                alignItems: "center"
            }} >

                <Grid item container xs={12} sm={12} md={5}>
                    <Grid item xs={12} sm={2} sx={{
                        display: "flex",
                        alignItems: "center"
                    }} >
                        <Typography>Role Name</Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField value={name} onChange={e => {
                            dispatch(handleChangeSetupRoleName(e.target.value))
                        }} size="small" placeholder="Admin" fullWidth sx={{
                            '& .MuiInputBase-root': {
                                fontSize: 12
                            }
                        }} />
                    </Grid>
                </Grid>

                <Grid item container xs={12}>
                    <ExplicitTable columns={[{ name: "Page" }, { name: "Permissions" }]}>
                        {rolePermissions.map((per, pageIndex) => (
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
                                                    onChange={(e) => {
                                                        dispatch(handleChangeSetupRolePermission({
                                                            action: "all",
                                                            pageIndex: pageIndex,
                                                            checked: e.target.checked
                                                        }))
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
                                                        onChange={(e) => {
                                                            dispatch(handleChangeSetupRolePermission({
                                                                action: "one",
                                                                pageIndex: pageIndex,
                                                                permissionIndex: permissionIndex,
                                                                checked: e.target.checked
                                                            }))
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
                </Grid>

                <Grid item container xs={12} sm={12}>
                    <Button variant="contained" size="small" sx={{ px: 4 }}
                        onClick={async () => {
                            try {
                                roleId === null ? await postRoleApi({
                                    name: name,
                                    permissions: rolePermissions
                                }) : await putRoleApi({
                                    name: name,
                                    permissions: rolePermissions,
                                    id: roleId
                                })
                                navigate(`/${ROUTES.roles}`)
                            } catch (err) {
                                openErrorToast(err.message ? err.message : err)
                            }
                        }}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}
export default SetupRole