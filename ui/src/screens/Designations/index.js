import { Chip, Container, Fab, Grid, IconButton, TextField, Tooltip } from "@mui/material"
import AppBreadCrumbs from "../../components/BreadCrumbs"
import { BREADCRUMBS, TABLE_HEADS, TABLE_HEADS_SA } from "./constants"
import React from "react"
import { openErrorToast, openSuccessToast } from "../../common/toast"
import { useDispatch, useSelector } from "react-redux"
import { designationsRequested, getDesignationId, getDesignationList, getDesignationModalOpen, getDesignationName, handleChangeDesignationId, handleChangeDesignationModalOpen, handleChangeDesignationName, handleResetDesignationModal } from "./designationSlice"
import { handleAddLoading, handleRemoveLoading } from "../../common/commonSlice"
import ExplicitTable, { StyledTableCell, StyledTableRow } from "../../components/ExplicitTable"
import { getUserRole } from "../Login/loginSlice"
import NothingFound from "../../components/NothingFound"
import { ROLES } from "../../Layout/Navigation/constants"
import icons from "../../common/icons"
import Dialog from "../../components/Dialog"
import { Controller, useForm } from "react-hook-form"
import { deleteDesignationsApi, postDesignationsApi, updateDesignationsApi } from "../../api"


const Designations = () => {
    const { handleSubmit, control, clearErrors, reset, formState: { errors }, setValue } = useForm()
    const dispatch = useDispatch()
    const userRole = useSelector(getUserRole)
    const disgnationsList = useSelector(getDesignationList)
    const designationModalOpen = useSelector(getDesignationModalOpen)
    const name = useSelector(getDesignationName)
    const id = useSelector(getDesignationId)
    const loadDesignations = async () => {
        try {
            dispatch(handleAddLoading())
            dispatch(designationsRequested()).unwrap()
            dispatch(handleRemoveLoading())

        } catch (err) {
            openErrorToast(err.message ? err.message : err)
            dispatch(handleRemoveLoading())
        }
    }
    React.useEffect(() => {
        setValue("name", name)
    }, [setValue, name])

    React.useEffect(() => {
        loadDesignations()
    }, [])


    const tableActionButtons = [
        {
            label: "Edit",
            variant: "contained",
            action: (designation) => {
                dispatch(handleAddLoading())
                dispatch(handleChangeDesignationName(designation.name))
                dispatch(handleChangeDesignationId(designation.id))
                dispatch(handleChangeDesignationModalOpen(true))
                dispatch(handleRemoveLoading())
            },
            icon: icons.BorderColor,
            color: "primary"
        },
        {
            label: "Delete",
            variant: "contained",
            action: async (designation) => {
                try {
                    dispatch(handleAddLoading())
                    await deleteDesignationsApi({ id: designation.id })
                    openSuccessToast("Record Deleted")
                    loadDesignations()
                    dispatch(handleRemoveLoading())
                } catch (err) {
                    openErrorToast(err.message ? err.message : err)
                    dispatch(handleRemoveLoading())
                }
            },
            icon: icons.Delete,
            color: "error"
        }
    ]

    return (
        <Container maxWidth="xl">
            <AppBreadCrumbs pageTitle={"Designations"} paths={BREADCRUMBS} />
            <Grid container maxWidth="xl" >
                <Grid item xs={!2} md={12} sx={{
                    p: 2,
                    boxShadow: theme => theme.shadows[5],
                    background: theme => theme.palette.background.paper,
                    mb: 1
                }}>
                    {disgnationsList.length > 0 ?
                        <ExplicitTable columns={userRole === ROLES.superadmin ? TABLE_HEADS_SA : TABLE_HEADS} tableSize="small">
                            {disgnationsList.map(designation => (
                                <StyledTableRow key={designation.id}>
                                    <StyledTableCell>{designation.name}</StyledTableCell>
                                    <StyledTableCell><i>{designation.name}</i></StyledTableCell>
                                    {userRole === ROLES.superadmin ? <StyledTableCell>{designation.deletedAt === null ? <Chip label="Active" color="success" size="small" /> : <Chip label="Inactive" color="error" size="small" />}</StyledTableCell> : ""}
                                    <StyledTableCell>
                                        {tableActionButtons.map(btn => (
                                            <IconButton color={btn.color} onClick={() => btn.action(designation)}>
                                                <btn.icon />
                                            </IconButton>
                                        ))}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </ExplicitTable>

                        : <NothingFound pageIcon={{
                            icon: icons.School
                        }} pageTitle="Designation" action={() => dispatch(handleChangeDesignationModalOpen(true))} />}
                </Grid>
            </Grid>


            <Tooltip title="Add Class">
                <Fab color="primary" onClick={e => dispatch(handleChangeDesignationModalOpen(true))} sx={{
                    position: "absolute",
                    right: 50,
                    bottom: 50
                }}>
                    <icons.Add />
                </Fab>
            </Tooltip>

            <Dialog dailogOpen={designationModalOpen} size={"sm"} title="Designation" hasCloseIcon handleClose={e => {
                clearErrors()
                reset()
                dispatch(handleResetDesignationModal())
            }}
                actionsButtonArray={[
                    {
                        label: "Done",
                        color: "primary",
                        variant: "contained",
                        action: handleSubmit(async (data) => {
                            try {
                                dispatch(handleAddLoading())
                                id === null ? await postDesignationsApi({ name }) : await updateDesignationsApi({ id, name })
                                loadDesignations()
                                clearErrors()
                                reset()
                                dispatch(handleResetDesignationModal())
                                dispatch(handleRemoveLoading())
                            } catch (err) {
                                openErrorToast(err.message ? err.message : err)
                                dispatch(handleRemoveLoading())
                            }
                        }),
                        size: "small"
                    }
                ]}>
                <Grid container>
                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="name"
                            rules={{
                                required: "This field is required"
                            }}
                            render={({ field }) => (
                                <TextField
                                    error={errors.name && !errors.name.touched && !errors.name.dirty}
                                    helperText={errors.name && errors.name.message}
                                    label="Designation Name" size="small" fullWidth value={name} onChange={e => {
                                        field.onChange(e)
                                        dispatch(handleChangeDesignationName(e.target.value))
                                    }} />
                            )}
                        />
                    </Grid>
                </Grid>
            </Dialog>
        </Container>
    )
}

export default Designations