import { Avatar, Box, Container, Fab, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from "@mui/material"
import ExplicitTable, { StyledTableCell, StyledTableRow } from "../../components/ExplicitTable"
import { BREADCRUMBS, TABLE_HEADS } from "./constants"
import Icons from "../../common/icons"
import AppBreadCrumbs from "../../components/BreadCrumbs"
import Dialog from "../../components/Dialog"
import { Controller, useForm } from 'react-hook-form'
import { useTheme } from "@emotion/react"
import React from "react"
import { openErrorToast, openSuccessToast } from "../../common/toast"
import { getAllClasses, getAllStudents, postStudent } from "../../api"
import InputMask from "react-input-mask";


const Students = () => {
    const { control, clearErrors, reset, setValue, handleSubmit, formState: { errors } } = useForm()
    const theme = useTheme()

    const [classes, setClasses] = React.useState([])
    const [studentsList, setStudentsList] = React.useState([])
    const [base64image, setBase64image] = React.useState(null)

    const [modalOpen, setModalOpen] = React.useState(false)

    const laodAllClasses = async () => {
        try {
            const classes = await getAllClasses()
            setClasses(classes.data.classes)
        } catch (err) {
            openErrorToast(err)
        }
    }

    const loadStudents = async () => {
        try {
            const students = await getAllStudents()
            setStudentsList(students.data.students)
        } catch (err) {
            openErrorToast(err)
        }
    }

    const handleChange2Base64 = (e) => {
        const file = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setBase64image(reader.result)
            // cb(reader.result)
        };
    }
    React.useEffect(() => {
        laodAllClasses()
        loadStudents()
        return () => laodAllClasses()
    }, [])


    const tableActionButtons = [
        {
            label: "Challans",
            variant: "contained",
            action: (student) => {
                console.log("clicked on challan", student.id)
             },
            icon: Icons.ReceiptLong,
            color: "warning"
        },
        {
            label: "Edit",
            variant: "contained",
            action: (student) => { },
            icon: Icons.BorderColor,
            color: "primary"
        },
        {
            label: "Delete",
            variant: "contained",
            action: (student) => { },
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
                    mb: 1
                }}>
                    <ExplicitTable columns={TABLE_HEADS} tableSize="small">
                        {studentsList.length > 0 ?
                            studentsList.map(student => (
                                <StyledTableRow key={student.id}>
                                    <StyledTableCell><Avatar src={student.avatar} /></StyledTableCell>
                                    <StyledTableCell>{student.name}</StyledTableCell>
                                    <StyledTableCell>{student.father_name}</StyledTableCell>
                                    <StyledTableCell>{student.phone_1}</StyledTableCell>
                                    {/* <StyledTableCell>{student.phone_2}</StyledTableCell> */}
                                    <StyledTableCell>{student.address}</StyledTableCell>
                                    <StyledTableCell>
                                        {tableActionButtons.map(btn => (
                                            <IconButton color={btn.color} onClick={() => btn.action(student)}>
                                                <btn.icon />
                                            </IconButton>
                                        ))}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                            : "Nothin here"}
                    </ExplicitTable>
                </Grid>
            </Grid>

            <Tooltip placement="top" title="Add New Student">
                <Fab color="primary" onClick={() => setModalOpen(!modalOpen)} sx={{
                    position: "absolute",
                    right: 50,
                    bottom: 50
                }}>
                    <Icons.Add />
                </Fab>
            </Tooltip>


            <Dialog dailogOpen={modalOpen} clickAwayListener={false} size={"md"} hasCloseIcon={true} title="Student"
                handleClose={() => {
                    setModalOpen(!modalOpen)
                    clearErrors()
                    reset()
                }}

                actionsButtonArray={[
                    {
                        label: "Done",
                        color: "primary",
                        variant: "contained",
                        action: handleSubmit(async (data) => {
                            try {
                                await postStudent({
                                    name: data.name,
                                    father_name: data.father_name,
                                    email_address: data.email_address,
                                    phone_1: data.phone_1,
                                    phone_2: data.phone_2,
                                    phone_3: data.phone_3,
                                    address: data.address,
                                    avatar: base64image,
                                    classId: data.classId
                                })
                                openSuccessToast("Record Added Successfully")
                                setModalOpen(!modalOpen)
                                reset()
                                clearErrors()
                                loadStudents()
                            } catch (err) {
                                openErrorToast(err)
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
                        {console.log({ classes })}
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
                                        value={field.value || ""} onChange={e => {
                                            field.onChange(e)
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
                                    value={field.value}
                                    onChange={e => field.onChange(e)}
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
                                    value={field.value}
                                    onChange={e => field.onChange(e)}
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
                                    value={field.value}
                                    onChange={e => field.onChange(e)}
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
                                    value={field.value}
                                    onChange={e => {
                                        field.onChange(e)
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
                                    value={field.value}
                                    onChange={e => field.onChange(e)}
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
                                    value={field.value}
                                    onChange={e => field.onChange(e)}
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
                                    value={field.value}
                                    onChange={e => field.onChange(e)}
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
                        {base64image ?
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
                                <img src={base64image} style={{
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