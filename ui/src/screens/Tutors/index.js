


//popup tp create a new user
// config to create salary

import { Chip, Container, Fab, Grid, IconButton, TextField, Tooltip } from "@mui/material"
import AppBreadCrumbs from "../../components/BreadCrumbs"
import { BREADCRUMBS, TABLE_HEADS, TABLE_HEADS_SA } from "./constants"
import React from "react"
import { openErrorToast, openSuccessToast } from "../../common/toast"
import { useDispatch, useSelector } from "react-redux"
import { handleAddLoading, handleRemoveLoading } from "../../common/commonSlice"
import { getSalary, getSalaryIncrementValue, getSalaryModelOpen, getTutor, getTutorId, getTutorsList, getTutorsModalOpen, handleChangeResetModel, handleChangeSalary, handleChangeSalaryIncrementValue, handleChangeSalaryModelOpen, handleChangeTutorAddress, handleChangeTutorContact, handleChangeTutorEmail, handleChangeTutorEmergencyContact, handleChangeTutorId, handleChangeTutorJoiningDate, handleChangeTutorName, handleChangeTutorsModalOpen, tutorsRequested } from "./tutorSlice"
import NothingFound from "../../components/NothingFound"
import Icons from "../../common/icons"
import ExplicitTable, { StyledTableCell, StyledTableRow } from "../../components/ExplicitTable"
import { ROLES } from "../../Layout/Navigation/constants"
import { getUserRole } from "../Login/loginSlice"
import Dialog from "../../components/Dialog"
import { Controller, useForm } from "react-hook-form"
import { postSalaryApi, postTutorsApi, updateTutorApi } from "../../api"

const Tutors = () => {
    const dispatch = useDispatch()
    const tutorsList = useSelector(getTutorsList)
    const tutor = useSelector(getTutor)
    const tutorModelOpen = useSelector(getTutorsModalOpen)
    const userRole = useSelector(getUserRole)
    const tutorId = useSelector(getTutorId)
    const salaryModelOpen = useSelector(getSalaryModelOpen)
    const salary = useSelector(getSalary)
    const salaryIncrementValue = useSelector(getSalaryIncrementValue)


    const [tutList, setTutList] = React.useState([])
    const [nameFilter, setNameFilter] = React.useState([])
    const [emailFilter, setEmailFilter] = React.useState([])

    const { control, handleSubmit, setValue, reset, clearErrors, formState: { errors } } = useForm()

    React.useEffect(() => {
        setValue("name", tutor.name)
        setValue("email", tutor.email)
        setValue("contact", tutor.contact)
        setValue("emergency_contact", tutor.emergency_contact)
        setValue("address", tutor.address)
        setValue("joining_date", tutor.joining_date)
    }, [setValue, tutor])

    React.useEffect(() => {
        if (tutorsList.length > 0) {
            setTutList(tutorsList)
        }
    }, [tutorsList])

    const tableActionButtons = [
        {
            label: "Edit",
            variant: "contained",
            action: (tutor) => {
                dispatch(handleChangeTutorId(tutor.id))
                dispatch(handleChangeTutorName(tutor.name))
                dispatch(handleChangeTutorEmail(tutor.email))
                dispatch(handleChangeTutorContact(tutor.contact))
                dispatch(handleChangeTutorEmergencyContact(tutor.emergency_contact))
                dispatch(handleChangeTutorAddress(tutor.address))
                dispatch(handleChangeTutorJoiningDate(tutor.joining_date))
                dispatch(handleChangeTutorsModalOpen(true))
            },
            icon: Icons.BorderColor,
            color: "primary"
        },
        {
            label: "Delete",
            variant: "contained",
            action: async (tutor) => {
                try {

                } catch (err) {
                    openErrorToast(err.message ? err.message : err)
                }
            },
            icon: Icons.Delete,
            color: "error"
        },
        {
            label: "Configure",
            variant: "contained",
            action: async (tutor) => {
                try {
                    dispatch(handleChangeTutorId(tutor.id))
                    dispatch(handleChangeSalaryModelOpen(true))
                } catch (err) {
                    openErrorToast(err.message ? err.message : err)
                }
            },
            icon: Icons.Settings,
            color: "success"
        }
    ]

    const loadTutorsList = async () => {
        try {
            dispatch(handleAddLoading())
            dispatch(tutorsRequested()).unwrap()
            openSuccessToast("Tutors Listed Loaded")
            dispatch(handleRemoveLoading())
        } catch (err) {
            dispatch(handleRemoveLoading())
            openErrorToast(err.message ? err.message : err)
        }
    }

    React.useEffect(() => {
        loadTutorsList()
    }, [])

    React.useEffect(() => {
        if (nameFilter) {
            setTutList(tutList.filter(ele => ele.name.toLowerCase().includes(nameFilter.toLowerCase())))
        } else {
            setTutList(tutorsList)
        }
    }, [nameFilter])

    React.useEffect(() => {
        if (emailFilter) {
            console.log({emailFilter})
            console.log({emailFilter: tutList.filter(ele => ele.email.toLowerCase().includes(emailFilter.toLowerCase()))})
            setTutList(tutList.filter(ele => ele.email.toLowerCase().includes(emailFilter.toLowerCase())))
        } else {
            setTutList(tutorsList)
        }
    }, [emailFilter])

    return (
        <Container maxWidth="xl">
            <AppBreadCrumbs pageTitle={"Tutors"} paths={BREADCRUMBS} />
            <Grid container maxWidth="xl" sx={{
                p: 2,
                boxShadow: theme => theme.shadows[5],
                background: theme => theme.palette.background.paper,
                mb: 1
            }} >
                <Grid container spacing={1} item xs={!2} md={12} sx={{
                    mb: 1,
                    pt: 1
                }}>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Search by name"
                            value={nameFilter}
                            onChange={e => {
                                setNameFilter(e.target.value)
                            }}
                            fullWidth
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Search by Email"
                            value={emailFilter}
                            onChange={e => {
                                setEmailFilter(e.target.value)
                            }}
                            fullWidth
                            size="small"
                        />
                    </Grid>
                </Grid>
                <Grid item xs={!2} md={12} >
                    {tutList.length > 0 ?
                        <ExplicitTable columns={userRole === ROLES.superadmin ? TABLE_HEADS_SA : TABLE_HEADS} tableSize="small">
                            {tutList.map((tutor, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{tutor.name}</StyledTableCell>
                                    <StyledTableCell>{tutor.email}</StyledTableCell>
                                    <StyledTableCell>{tutor.contact}</StyledTableCell>
                                    <StyledTableCell>{tutor.emergency_contact}</StyledTableCell>
                                    <StyledTableCell>{tutor.address}</StyledTableCell>
                                    <StyledTableCell>{tutor.joining_date}</StyledTableCell>
                                    {userRole === ROLES.superadmin ? <StyledTableCell>{tutor.deletedAt === null ? <Chip label="Active" color="success" size="small" /> : <Chip label="Inactive" color="error" size="small" />}</StyledTableCell> : ""}
                                    <StyledTableCell>
                                        {tableActionButtons.map(btn => (
                                            <IconButton color={btn.color} onClick={() => btn.action(tutor)}>
                                                <btn.icon />
                                            </IconButton>
                                        ))}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </ExplicitTable>
                        :
                        <NothingFound pageIcon={{
                            icon: Icons.CastForEducation
                        }} pageTitle="Tutor" action={() => dispatch(handleChangeTutorsModalOpen(true))} />}
                </Grid>
            </Grid>


            <Tooltip title="Add New Tutor" placement="top">
                <Fab onClick={() => {
                    dispatch(handleChangeTutorsModalOpen(true))
                }} sx={{
                    position: "absolute",
                    right: 50,
                    bottom: 50
                }} color="primary">
                    <Icons.Add />
                </Fab>
            </Tooltip>

            <Dialog dailogOpen={tutorModelOpen} title="Tutor" size={"sm"}
                hasCloseIcon={true}
                clickAwayListener={true}
                handleClose={() => {
                    dispatch(handleChangeResetModel())
                    reset()
                    clearErrors()
                }}
                actionsButtonArray={[
                    {
                        label: "Done",
                        color: "primary",
                        variant: "contained",
                        action: handleSubmit(async (data) => {
                            try {

                                dispatch(handleAddLoading())
                                tutorId === null ? await postTutorsApi({ tutor }) :
                                    await updateTutorApi({ tutor, id: tutorId })
                                openSuccessToast("Record Added Successfully")
                                dispatch(handleChangeResetModel())
                                reset()
                                clearErrors()
                                loadTutorsList()
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
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Controller
                            name="name"
                            defaultValue={tutor.name}
                            rules={{
                                required: "Tutor name is mandatory"
                            }}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    required
                                    error={errors.name && !errors.name.touched && !errors.name.dirty}
                                    helperText={errors.name && errors.name.message}
                                    size="small"
                                    fullWidth
                                    label="Tutor Name"
                                    value={tutor.name}
                                    onChange={(e) => {
                                        field.onChange(e)
                                        dispatch(handleChangeTutorName(e.target.value))
                                    }}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="email"
                            defaultValue={tutor.email}
                            rules={{
                                required: "Email Address is mandatory"
                            }}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    required
                                    error={errors.email && !errors.email.touched && !errors.email.dirty}
                                    helperText={errors.email && errors.email.message}
                                    size="small"
                                    fullWidth
                                    label="Email Address"
                                    value={tutor.email}
                                    onChange={(e) => {
                                        field.onChange(e)
                                        dispatch(handleChangeTutorEmail(e.target.value))
                                    }}
                                />
                            )}
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <Controller
                            name="contact"
                            defaultValue={tutor.contact}
                            rules={{
                                required: "Contact Number is mandatory"
                            }}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    required
                                    error={errors.contact && !errors.contact.touched && !errors.contact.dirty}
                                    helperText={errors.contact && errors.contact.message}
                                    size="small"
                                    fullWidth
                                    label="Contact Number"
                                    value={tutor.contact}
                                    onChange={(e) => {
                                        field.onChange(e)
                                        dispatch(handleChangeTutorContact(e.target.value))
                                    }}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="emergency_contact"
                            defaultValue={tutor.emergency_contact}
                            rules={{
                                required: "Emergency Contact Number is mandatory"
                            }}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    required
                                    error={errors.emergency_contact && !errors.emergency_contact.touched && !errors.emergency_contact.dirty}
                                    helperText={errors.emergency_contact && errors.emergency_contact.message}
                                    size="small"
                                    fullWidth
                                    label="Emergency Contact Number"
                                    value={tutor.emergency_contact}
                                    onChange={(e) => {
                                        field.onChange(e)
                                        dispatch(handleChangeTutorEmergencyContact(e.target.value))
                                    }}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="joining_date"
                            defaultValue={tutor.joining_date}
                            rules={{
                                required: "Joining Date is mandatory"
                            }}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    required
                                    error={errors.joining_date && !errors.joining_date.touched && !errors.joining_date.dirty}
                                    helperText={errors.joining_date && errors.joining_date.message}
                                    size="small"
                                    type="date"
                                    fullWidth
                                    label="Joining Date"
                                    value={tutor.joining_date}
                                    onChange={(e) => {
                                        field.onChange(e)
                                        dispatch(handleChangeTutorJoiningDate(e.target.value))
                                    }}
                                />
                            )}
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <Controller
                            name="address"
                            defaultValue={tutor.address}
                            rules={{
                                required: "Address is mandatory"
                            }}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    required
                                    error={errors.address && !errors.address.touched && !errors.address.dirty}
                                    helperText={errors.address && errors.address.message}
                                    size="small"
                                    multiline
                                    rows={2}
                                    fullWidth
                                    label="Address"
                                    value={tutor.address}
                                    onChange={(e) => {
                                        field.onChange(e)
                                        dispatch(handleChangeTutorAddress(e.target.value))
                                    }}
                                />
                            )}
                        />
                    </Grid>


                </Grid>
            </Dialog>



            <Dialog dailogOpen={salaryModelOpen} title="Salary Info" size={"sm"}
                hasCloseIcon={true}
                clickAwayListener={false}
                handleClose={() => {
                    dispatch(handleChangeSalaryModelOpen(false))
                    dispatch(handleChangeSalaryIncrementValue(0))
                    dispatch(handleChangeSalary(0))
                    reset()
                    clearErrors()
                }}
                actionsButtonArray={[
                    {
                        label: "Done",
                        color: "primary",
                        variant: "contained",
                        action: async (data) => {
                            try {

                                dispatch(handleAddLoading())
                                await postSalaryApi({
                                    salary,
                                    incrementValue: salaryIncrementValue,
                                    tutorId
                                })
                                openSuccessToast("Record Added Successfully")
                                dispatch(handleChangeSalaryModelOpen(false))
                                dispatch(handleChangeSalaryIncrementValue(0))
                                dispatch(handleChangeSalary(0))
                                dispatch(handleRemoveLoading())
                            } catch (err) {
                                openErrorToast(err.message ? err.message : err)
                                dispatch(handleRemoveLoading())
                            }
                        },
                        size: "small"
                    }
                ]}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            type="number"
                            value={salary}
                            label="Salary In PKR"
                            onChange={e => {
                                dispatch(handleChangeSalary(e.target.value))
                            }}
                            fullWidth
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="number"
                            value={salaryIncrementValue}
                            label="Increment in Percentage"
                            onChange={e => {
                                dispatch(handleChangeSalaryIncrementValue(e.target.value))
                            }}
                            fullWidth
                            size="small"
                        />
                    </Grid>
                </Grid>

            </Dialog>
        </Container>
    )
}

export default Tutors