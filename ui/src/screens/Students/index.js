import { Avatar, Box, Chip, Container, Fab, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from "@mui/material"
import ExplicitTable, { StyledTableCell, StyledTableRow } from "../../components/ExplicitTable"
import { BREADCRUMBS, TABLE_HEADS, TABLE_HEADS_SA } from "./constants"
import Icons from "../../common/icons"
import AppBreadCrumbs from "../../components/BreadCrumbs"
import Dialog from "../../components/Dialog"
import { Controller, useForm } from 'react-hook-form'
import { useTheme } from "@emotion/react"
import React from "react"
import { openErrorToast, openSuccessToast } from "../../common/toast"
import { postStudent, updateStudent, deleteStudentApi } from "../../api"
import InputMask from "react-input-mask";
import { useSelector, useDispatch } from "react-redux"
import {
    getStudentId,
    getStudentName,
    getStudentFatherName,
    getStudentEmailAddress,
    getStudentPhone1,
    getStudentPhone2,
    getStudentPhone3,
    getStudentAddress,
    getStudentAvatar,
    getStudentClassId,
    getStudentModalOpen,
    getStudenstList,
    classesRequested,
    studentsListRequested,
    handleResetSlice,
    handleChangeStudentModalOpen,
    handleChangeStudentClassId,
    handleChangeStudentId,
    handleChangeStudentName,
    handleChangeStudentFatherName,
    handleChangeStudentEmailAddress,
    handleChangeStudentPhone1,
    handleChangeStudentPhone2,
    handleChangeStudentPhone3,
    handleChangeStudentAddress,
    handleChangeStudentAvatar,
    getClassList,
    handleResetStudentModal
} from "./studentSlice"
import NothingFound from "../../components/NothingFound"
import { getUserRole } from "../Login/loginSlice"
import { ROLES } from "../../Layout/Navigation/constants"
import { handleAddLoading, handleRemoveLoading } from "../../common/commonSlice"


const Students = () => {
    const { control, clearErrors, reset, setValue, handleSubmit, formState: { errors } } = useForm()
    const theme = useTheme()

    // const [classes, setClasses] = React.useState([])
    // const [studentsList, setStudentsList] = React.useState([])
    // const [base64image, setBase64image] = React.useState(null)

    // const [modalOpen, setModalOpen] = React.useState(false)


    const id = useSelector(getStudentId)
    const name = useSelector(getStudentName)
    const father_name = useSelector(getStudentFatherName)
    const email_address = useSelector(getStudentEmailAddress)
    const phone_1 = useSelector(getStudentPhone1)
    const phone_2 = useSelector(getStudentPhone2)
    const phone_3 = useSelector(getStudentPhone3)
    const address = useSelector(getStudentAddress)
    const avatar = useSelector(getStudentAvatar)
    const classId = useSelector(getStudentClassId)
    const modalOpen = useSelector(getStudentModalOpen)
    const studentsList = useSelector(getStudenstList)
    const classes = useSelector(getClassList)
    const userRole = useSelector(getUserRole)

    const dispatch = useDispatch()


    React.useEffect(() => {
        setValue("name", name)
        setValue("father_name", father_name)
        setValue("email_address", email_address)
        setValue("phone_1", phone_1)
        setValue("phone_2", phone_2)
        setValue("phone_3", phone_3)
        setValue("address", address)
        setValue("avatar", avatar)
        setValue("classId", classId)
    }, [setValue, id, name, father_name, email_address, phone_1, phone_2, phone_3, address, avatar, classId])

    const handleChange2Base64 = (e) => {
        const file = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            // setBase64image(reader.result)
            dispatch(handleChangeStudentAvatar(reader.result))
            // cb(reader.result)
        };
    }
    React.useEffect(() => {
        dispatch(handleAddLoading())
        dispatch(classesRequested()).unwrap()
        dispatch(studentsListRequested()).unwrap()
        dispatch(handleRemoveLoading())
        return () => {
            dispatch(handleResetSlice())
        }
    }, [])


    const tableActionButtons = [
        // {
        //     label: "Challans",
        //     variant: "contained",
        //     action: (student) => {
        //         console.log("clicked on challan", student.id)
        //     },
        //     icon: Icons.ReceiptLong,
        //     color: "warning"
        // },
        {
            label: "Edit",
            variant: "contained",
            action: (student) => {
                dispatch(handleChangeStudentModalOpen(true))
                dispatch(handleChangeStudentId(student.id))
                dispatch(handleChangeStudentName(student.name))
                dispatch(handleChangeStudentFatherName(student.father_name))
                dispatch(handleChangeStudentEmailAddress(student.email_address))
                dispatch(handleChangeStudentPhone1(student.phone_1))
                dispatch(handleChangeStudentPhone2(student.phone_2))
                dispatch(handleChangeStudentPhone3(student.phone_3))
                dispatch(handleChangeStudentAddress(student.address))
                dispatch(handleChangeStudentAvatar(student.avatar))
                dispatch(handleChangeStudentClassId(student.classId))
            },
            icon: Icons.BorderColor,
            color: "primary"
        },
        {
            label: "Delete",
            variant: "contained",
            action: async (student) => {
                try {
                    await deleteStudentApi({ id: student.id })
                    dispatch(studentsListRequested()).unwrap()
                    openSuccessToast("Record Deleted")
                } catch (err) {
                    openErrorToast(err.message ? err.message : err)
                }
            },
            icon: Icons.Delete,
            color: "error"
        }
    ]
    return (
        <Container maxWidth="xl">
            <AppBreadCrumbs pageTitle={"Students"} paths={BREADCRUMBS} />
            <Grid container maxWidth="xl" >
                <Grid item xs={!2} md={12} sx={{
                    p: 2,
                    boxShadow: theme => theme.shadows[5],
                    background: theme => theme.palette.background.paper,
                    mb: 1
                }}>
                    {studentsList.length > 0 ?
                        <ExplicitTable columns={userRole === ROLES.superadmin ? TABLE_HEADS_SA : TABLE_HEADS} tableSize="small">
                            {studentsList.map(student => (
                                <StyledTableRow key={student.id}>
                                    {console.log({ student })}
                                    <StyledTableCell><Avatar src={student.avatar} /></StyledTableCell>
                                    <StyledTableCell>{student.name}</StyledTableCell>
                                    <StyledTableCell>{student.father_name}</StyledTableCell>
                                    <StyledTableCell>{student.phone_1}</StyledTableCell>
                                    <StyledTableCell>{student.address}</StyledTableCell>
                                    {userRole === ROLES.superadmin ? <StyledTableCell>{student.deletedAt === null ? <Chip label="Active" color="success" size="small" /> : <Chip label="Inactive" color="error" size="small" />}</StyledTableCell> : ""}
                                    <StyledTableCell>
                                        {tableActionButtons.map(btn => (
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
                        }} pageTitle="Student" action={() => dispatch(handleChangeStudentModalOpen(true))} />}
                </Grid>
            </Grid>

            <Tooltip placement="top" title="Add New Student">
                <Fab color="primary" onClick={() => dispatch(handleChangeStudentModalOpen(true))} sx={{
                    position: "absolute",
                    right: 50,
                    bottom: 50
                }}>
                    <Icons.Add />
                </Fab>
            </Tooltip>


            <Dialog dailogOpen={modalOpen} clickAwayListener={false} size={"md"} hasCloseIcon={true} title="Student"
                handleClose={() => {
                    dispatch(handleAddLoading())
                    dispatch(handleChangeStudentModalOpen(false))
                    clearErrors()
                    reset()
                    dispatch(handleResetStudentModal())
                    dispatch(handleRemoveLoading())
                }}

                actionsButtonArray={[
                    {
                        label: "Done",
                        color: "primary",
                        variant: "contained",
                        action: handleSubmit(async (data) => {
                            try {
                                dispatch(handleAddLoading())
                                id === null ? await postStudent({ name, father_name, email_address, phone_1, phone_2, phone_3, address, avatar, classId }) :
                                    await updateStudent({ id, name, father_name, email_address, phone_1, phone_2, phone_3, address, avatar, classId })
                                openSuccessToast("Record Added Successfully")
                                dispatch(handleChangeStudentModalOpen(false))
                                dispatch(handleResetStudentModal())
                                reset()
                                clearErrors()
                                dispatch(studentsListRequested()).unwrap()
                                dispatch(handleRemoveLoading())
                            } catch (err) {
                                openErrorToast(err)
                                dispatch(handleRemoveLoading())
                            }
                        }),
                        size: "small"
                    }
                ]}

            >
                <Grid container>
                    <Grid item xs={12} md={12} sx={{
                        mb: 2,
                    }}>
                        <Controller
                            control={control}
                            name="classId"
                            rules={{
                                required: {
                                    value: true,
                                    message: "This field is required"
                                }
                            }}
                            render={({ field }) => (
                                <FormControl fullWidth size="small">
                                    <InputLabel>Class</InputLabel>
                                    <Select
                                        error={errors.classId && !errors.classId.touched && !errors.classId.dirty}
                                        helperText={errors.classId && errors.classId.message}
                                        label="Class"
                                        value={classId || ""} onChange={e => {
                                            field.onChange(e)
                                            dispatch(handleChangeStudentClassId(e.target.value))
                                        }}>
                                        <MenuItem value={""}>{"Please select"}</MenuItem>
                                        {classes.length > 0 ?
                                            classes.map(c => (
                                                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                                            ))
                                            : ""}

                                    </Select>
                                    {errors.classId && <FormHelperText error >{errors.classId.message}</FormHelperText>}

                                </FormControl>
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} sx={{
                        mb: 2,
                        [theme.breakpoints.up("md")]: {
                            pr: 1
                        }
                    }}>
                        <Controller
                            control={control}
                            name="name"
                            rules={{
                                required: {
                                    value: true,
                                    message: "This field is required"
                                }
                            }}
                            render={({ field }) => (
                                <TextField
                                    error={errors.name && !errors.name.touched && !errors.name.dirty}
                                    value={name}
                                    onChange={e => {
                                        field.onChange(e)
                                        dispatch(handleChangeStudentName(e.target.value))
                                    }}
                                    size="small"
                                    label="Full Name"
                                    fullWidth
                                    helperText={errors.name && errors.name.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} sx={{
                        mb: 2,
                        [theme.breakpoints.up("md")]: {
                            pl: 1
                        }
                    }}>
                        <Controller
                            control={control}
                            name="father_name"
                            rules={{
                                required: {
                                    value: true,
                                    message: "This field is required"
                                }
                            }}
                            render={({ field }) => (
                                <TextField
                                    error={errors.father_name && !errors.father_name.touched && !errors.father_name.dirty}
                                    helperText={errors.father_name && errors.father_name.message}
                                    value={father_name}
                                    onChange={e => {
                                        field.onChange(e)
                                        dispatch(handleChangeStudentFatherName(e.target.value))
                                    }}
                                    size="small"
                                    label="Father Name"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} sx={{
                        mb: 2,
                        [theme.breakpoints.up("md")]: {
                            pr: 1
                        }
                    }}>
                        <Controller
                            control={control}
                            name="email_address"
                            rules={{
                                required: {
                                    value: true,
                                    message: "This field is required"
                                },
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "invalid email address"
                                }
                            }}
                            render={({ field }) => (
                                <TextField
                                    error={errors.email_address && !errors.email_address.touched && !errors.email_address.dirty}
                                    value={email_address}
                                    onChange={e => {
                                        field.onChange(e)
                                        dispatch(handleChangeStudentEmailAddress(e.target.value))
                                    }}
                                    size="small"
                                    label="Email Address"
                                    fullWidth
                                    helperText={errors.email_address && errors.email_address.message}
                                />
                            )}
                        />
                    </Grid>



                    <Grid item xs={12} md={6} sx={{
                        mb: 2,
                        [theme.breakpoints.up("md")]: {
                            pl: 1
                        }
                    }}>
                        <Controller
                            as={InputMask}
                            control={control}
                            name="phone_1"
                            mask="9999-999-9999"
                            alwaysShowMask={true}
                            rules={{
                                required: {
                                    value: true,
                                    message: "This field is required"
                                },
                                pattern: {
                                    value: /[0-9]{11}/,
                                    message: "Please enter 11 digits cell number in the format 03xxxxxxxxx"
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    error={errors.phone_1 && !errors.phone_1.touched && !errors.phone_1.dirty}
                                    helperText={errors.phone_1 && errors.phone_1.message}
                                    value={phone_1}
                                    onChange={e => {
                                        field.onChange(e)
                                        dispatch(handleChangeStudentPhone1(e.target.value))
                                    }
                                    }
                                    size="small"
                                    label="Father Contact"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>


                    <Grid item xs={12} md={6} sx={{
                        mb: 2,
                        [theme.breakpoints.up("md")]: {
                            pr: 1
                        }
                    }}>
                        <Controller
                            control={control}
                            name="phone_2"

                            render={({ field }) => (
                                <TextField
                                    error={errors.phone_2 && !errors.phone_2.touched && !errors.phone_2.dirty}
                                    value={phone_2}
                                    onChange={e => {
                                        field.onChange(e)
                                        dispatch(handleChangeStudentPhone2(e.target.value))
                                    }}
                                    size="small"
                                    label="Home Contact"
                                    fullWidth
                                    helperText={errors.phone_2 && errors.phone_2.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} sx={{
                        mb: 2,
                        [theme.breakpoints.up("md")]: {
                            pl: 1
                        }
                    }}>
                        <Controller
                            control={control}
                            name="phone_3"
                            render={({ field }) => (
                                <TextField
                                    error={errors.phone_3 && !errors.phone_3.touched && !errors.phone_3.dirty}
                                    helperText={errors.phone_3 && errors.phone_3.message}
                                    value={phone_3}
                                    onChange={e => {
                                        field.onChange(e)
                                        dispatch(handleChangeStudentPhone3(e.target.value))
                                    }}
                                    size="small"
                                    label="Emergency Contact"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>


                    <Grid item xs={12} sx={{
                        mb: 2,
                        [theme.breakpoints.up("md")]: {
                            pr: 1
                        }
                    }}>
                        <Controller
                            control={control}
                            name="address"
                            rules={{
                                required: {
                                    value: true,
                                    message: "This field is required"
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    multiline
                                    rows={2}
                                    error={errors.address && !errors.address.touched && !errors.address.dirty}
                                    value={address}
                                    onChange={e => {
                                        field.onChange(e)
                                        dispatch(handleChangeStudentAddress(e.target.value))
                                    }}
                                    size="small"
                                    label="Address"
                                    fullWidth
                                    helperText={errors.address && errors.address.message}
                                />
                            )}
                        />
                    </Grid>


                    <Grid item xs={12} sx={{
                        mb: 2,
                        [theme.breakpoints.up("md")]: {
                            pl: 1
                        }
                    }}>
                        {avatar ?
                            <Box sx={{
                                width: "100%",
                                height: "240px",
                                boxSizing: "border-box",
                                mb: 1.5,
                                border: theme => `1px dashed ${theme.palette.primary.main}`,
                                borderRadius: 2,
                                background: "#eee",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <img src={avatar} style={{
                                    width: 200,
                                    height: 200
                                }} />
                            </Box>
                            : ""}
                        <input type="file" onChange={handleChange2Base64} />
                    </Grid>
                </Grid>
            </Dialog>
        </Container>
    )
}

export default Students