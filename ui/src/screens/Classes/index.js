import { Chip, Container, Fab, Grid, IconButton, TextField, Tooltip } from "@mui/material"
import AppBreadCrumbs from "../../components/BreadCrumbs"
import { BREADCRUMBS, TABLE_HEADS, TABLE_HEADS_SA } from "./constants"
import { useDispatch, useSelector } from "react-redux"
import { classesRequested, getClass, getClassList, getClassModelOpen, handleChangeClassId, handleChangeClassModalOpen, handleChangeClassName, handleResetClassModal, handleResetClassSlice } from "./classSlice"
import { getUserRole } from "../Login/loginSlice"
import ExplicitTable, { StyledTableCell, StyledTableRow } from "../../components/ExplicitTable"
import NothingFound from "../../components/NothingFound"
import Icons from "../../common/icons"
import { openErrorToast, openSuccessToast } from "../../common/toast"
import { ROLES } from "../../Layout/Navigation/constants"
import Dialog from "../../components/Dialog"
import { Controller, useForm } from "react-hook-form"
import React from "react"
import { deleteClassesApi, postClassesApi, putClassesApi } from "../../api"
import { getLoadings, handleAddLoading, handleRemoveLoading } from "../../common/commonSlice"
import useCan from "../../hooks/useCan"

const Classes = () => {

    const classesList = useSelector(getClassList)
    const userRole = useSelector(getUserRole)
    const classes = useSelector(getClass)
    const classModalOpen = useSelector(getClassModelOpen)
    const { handleSubmit, control, clearErrors, reset, formState: { errors }, setValue } = useForm()
    const dispatch = useDispatch()
    const loading = useSelector(getLoadings)

    React.useEffect(() => {
        setValue("name", classes.name)
    }, [setValue, classes])


    const tableActionButtons = [
        {
            label: "Edit",
            variant: "contained",
            visibility: useCan("ClassUpdateClass"),
            action: (_class) => {
                dispatch(handleAddLoading())
                dispatch(handleChangeClassName(_class.name))
                dispatch(handleChangeClassId(_class.id))
                dispatch(handleChangeClassModalOpen(true))
                dispatch(handleRemoveLoading())
            },
            icon: Icons.BorderColor,
            color: "primary"
        },
        {
            label: "Delete",
            variant: "contained",
            visibility: useCan("ClassDeleteClass"),
            action: async (_class) => {
                try {
                    dispatch(handleAddLoading())
                    await deleteClassesApi({ id: _class.id })
                    openSuccessToast("Record Deleted")
                    dispatch(classesRequested()).unwrap()
                    dispatch(handleRemoveLoading())
                } catch (err) {
                    openErrorToast(err.message ? err.message : err)
                    dispatch(handleRemoveLoading())
                }
            },
            icon: Icons.Delete,
            color: "error"
        }
    ]


    React.useEffect(() => {
        dispatch(handleAddLoading())
        dispatch(classesRequested()).unwrap()
        dispatch(handleRemoveLoading())

        return () => {
            dispatch(handleResetClassSlice())
        }
    }, [])

    return (
        <Container maxWidth="xl">
            <AppBreadCrumbs pageTitle={"Classes"} paths={BREADCRUMBS} />
            <Grid container maxWidth="xl" >
                <Grid item xs={!2} md={12} sx={{
                    p: 2,
                    boxShadow: theme => theme.shadows[5],
                    background: theme => theme.palette.background.paper,
                    mb: 1
                }}>

                    {classesList.length > 0 ?
                        <ExplicitTable columns={userRole === ROLES.superadmin ? TABLE_HEADS_SA : TABLE_HEADS} tableSize="small">
                            {classesList.map(student => (
                                <StyledTableRow key={student.id}>
                                    <StyledTableCell>{student.name}</StyledTableCell>
                                    <StyledTableCell><i>{student.name}</i></StyledTableCell>
                                    {userRole === ROLES.superadmin ? <StyledTableCell>{student.deletedAt === null ? <Chip label="Active" color="success" size="small" /> : <Chip label="Inactive" color="error" size="small" />}</StyledTableCell> : ""}
                                    <StyledTableCell>
                                        {tableActionButtons.filter(btn => btn.visibility).map(btn => (
                                            <IconButton color={btn.color} onClick={() => btn.action(student)}>
                                                <btn.icon />
                                            </IconButton>
                                        ))}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </ExplicitTable>

                        : <NothingFound pageIcon={{
                            icon: Icons.School
                        }} pageTitle="Classes" action={() => dispatch(handleChangeClassModalOpen(true))} />}

                </Grid>
            </Grid>
            {useCan("ClassAddClass") &&
                <Tooltip title="Add Class">
                    <Fab color="primary" onClick={e => dispatch(handleChangeClassModalOpen(true))} sx={{
                        position: "absolute",
                        right: 50,
                        bottom: 50
                    }}>
                        <Icons.Add />
                    </Fab>
                </Tooltip>
            }


            <Dialog clickAwayListener={false} size={"sm"} title="Class" hasCloseIcon handleClose={e => {
                clearErrors()
                reset()
                dispatch(handleResetClassModal())
            }} dailogOpen={classModalOpen}

                actionsButtonArray={[
                    {
                        label: "Done",
                        color: "primary",
                        variant: "contained",
                        action: handleSubmit(async (data) => {
                            try {
                                dispatch(handleAddLoading())
                                const resposne = classes.id === null ? await postClassesApi({ name: classes.name }) :
                                    await putClassesApi({ id: classes.id, name: classes.name })
                                openSuccessToast("Class Added")
                                clearErrors()
                                reset()
                                dispatch(handleResetClassModal())
                                dispatch(classesRequested()).unwrap()
                                dispatch(handleRemoveLoading())
                            } catch (err) {
                                openErrorToast(err.message ? err.message : err)
                                dispatch(handleRemoveLoading())
                            }
                        }),
                        size: "small"
                    }
                ]}
            >
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
                                    label="Class Name" size="small" fullWidth value={classes.name} onChange={e => {
                                        field.onChange(e)
                                        dispatch(handleChangeClassName(e.target.value))
                                    }} />
                            )}
                        />
                    </Grid>
                </Grid>
            </Dialog>
        </Container>
    )
}

export default Classes