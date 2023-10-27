import { Avatar, Box, Button, Checkbox, Chip, Container, Fab, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputLabel, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Select, TextField, Tooltip, Typography } from "@mui/material"
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
    handleResetStudentModal,
    getStudentFatherCNIC,
    getStudentCNIC,
    handleChangeStudentFatherCNIC,
    handleChangeStudentCNIC,
    getQueryModalOpen,
    handleChangeQueryModalOpen,
    getClassSearchList,
    handleChangeClassSearch,
    getCnicSearch,
    getNameSearch,
    handleChangeNameSearch,
    handleChangeCnicSearch,
    getClassSearch,
    getStudentGender,
    handleChangeStudentGender,
    getDateEnd,
    getDateStart,
    handleChangeDateStart,
    handleChangeDateEnd,
    getContactSearch,
    handleChangeContactSearch
} from "./studentSlice"
import NothingFound from "../../components/NothingFound"
import { getUserRole } from "../Login/loginSlice"
import { ROLES, ROUTES } from "../../Layout/Navigation/constants"
import { handleAddLoading, handleRemoveLoading } from "../../common/commonSlice"
import { BASE_URL } from "../../api/constants"
import { useNavigate } from "react-router"
import { handleChangePreviewStudentId } from "../PreviewStudent/previewStudentSlice"
import Queries from "../Queries"
import useCan from "../../hooks/useCan"
import { MuiFileInput } from 'mui-file-input'



const StudentsTableRow = React.memo(({ student, tableActionButtons }) => {
    const userRole = useSelector(getUserRole)
    console.log("In Table Row")
    return (
        <StyledTableRow key={student.id}>
            <StyledTableCell>
                {
                    !student.avatar ? <Avatar>{student.name.charAt(0)}</Avatar> : <Avatar src={`${window.location.protocol}//${window.location.hostname}:3502/` + student.avatar} />
                }
            </StyledTableCell>
            <StyledTableCell>{student.name}</StyledTableCell>
            <StyledTableCell>{student["class.name"]}</StyledTableCell>
            <StyledTableCell>{student.father_name}</StyledTableCell>
            <StyledTableCell>{student.email_address}</StyledTableCell>
            <StyledTableCell>{student.cnic}</StyledTableCell>
            {userRole === ROLES.superadmin ? <StyledTableCell>{student.deletedAt === null ? <Chip label="Active" color="success" size="small" /> : <Chip label="Inactive" color="error" size="small" />}</StyledTableCell> : ""}
            <StyledTableCell>
                {tableActionButtons.filter(btn => btn.visibility).map(btn => (
                    <IconButton color={btn.color} onClick={() => btn.action(student)}>
                        <btn.icon />
                    </IconButton>

                ))}
            </StyledTableCell>
        </StyledTableRow>
    )
}, (prev, next) => {
    return prev.student.id === next.student.id
})

// const AddButtonCompoentn = React.memo(({ addStudent }) => {
//     const dispatch = useDispatch()
//     return (
//         <>
//             {addStudent &&
//                 <Tooltip placement="top" title="Add New Student">
//                     <Fab color="primary" onClick={() => dispatch(handleChangeStudentModalOpen(true))} sx={{
//                         position: "absolute",
//                         right: 50,
//                         bottom: 50
//                     }}>
//                         <Icons.Add />
//                     </Fab>
//                 </Tooltip>
//             }</>
//     )
// })

const Students = () => {


    const dispatch = useDispatch()
    const studentsList = useSelector(getStudenstList)
    const userRole = useSelector(getUserRole)
    const queryModalOpen = useSelector(getQueryModalOpen)
    const classSearchList = useSelector(getClassSearchList)
    const cnicSearch = useSelector(getCnicSearch)
    const nameSearch = useSelector(getNameSearch)
    const classSearch = useSelector(getClassSearch)
    const contactSearch = useSelector(getContactSearch)

    const dateEnd = useSelector(getDateEnd)
    const dateStart = useSelector(getDateStart)
    //permission
    const addStudent = useCan('StudentsAddStudent')

    const navigate = useNavigate()

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
        {
            label: "Edit",
            variant: "contained",
            visibility: useCan("StudentsUpdateStudent"),
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
                dispatch(handleChangeStudentGender(student.gender))
                dispatch(handleChangeStudentFatherCNIC(student.father_cnic))
                dispatch(handleChangeStudentCNIC(student.cnic))
            },
            icon: Icons.BorderColor,
            color: "primary"
        },

        {
            label: "Profile",
            variant: "contained",
            visibility: useCan("StudentsViewStudent"),
            action: async (student) => {
                try {
                    dispatch(handleChangePreviewStudentId(student.id))
                    navigate(`/${ROUTES.previewStudent}`)
                } catch (err) {
                    openErrorToast(err.message ? err.message : err)
                }
            },
            icon: Icons.Settings,
            color: "success"
        },
        {
            label: "Delete",
            visibility: useCan("StudentsDeleteStudent"),
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
        },
    ]
    return (
        <Container maxWidth="xl">
            <AppBreadCrumbs pageTitle={"Students"} paths={BREADCRUMBS} />
            <Grid container maxWidth="xl" >
                <Grid item container xs={12} md={12} sx={{
                    p: 2,
                    boxShadow: theme => theme.shadows[5],
                    background: theme => theme.palette.background.paper,
                    mb: 1
                }}>
                    <Grid item xs={12} sm={6} md={2} >
                        <TextField placeholder="Search by name" value={nameSearch}
                            sx={{ maxWidth: "98%" }}
                            onChange={e => {
                                dispatch(handleChangeNameSearch(e.target.value))
                            }}
                            InputProps={{
                                startAdornment: <Icons.Search sx={{ mr: 1 }} />
                            }} fullWidth size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField placeholder="Search by CNIC"
                            sx={{ maxWidth: "98%" }}
                            value={cnicSearch}
                            onChange={e => {
                                dispatch(handleChangeCnicSearch(e.target.value))
                            }}
                            InputProps={{
                                startAdornment: <Icons.Search sx={{ mr: 1 }} />
                            }} fullWidth size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField placeholder="Search by Contact Number"
                            sx={{ maxWidth: "98%" }}
                            value={contactSearch}
                            onChange={e => {
                                dispatch(handleChangeContactSearch(e.target.value))
                            }}
                            InputProps={{
                                startAdornment: <Icons.Search sx={{ mr: 1 }} />
                            }} fullWidth size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} >
                        <FormControl fullWidth size="small" sx={{ maxWidth: "98%" }}>
                            <InputLabel id="demo-multiple-chip-label">Class Search</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                renderValue={(selected) => (
                                    selected.length === classSearchList.length ? <Chip size="small" label={"All"} /> : <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip size="small" key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                fullWidth
                                value={classSearchList.filter(cls => cls.selected).length > 0 ? classSearchList.filter(cls => cls.selected).map(cls => cls.name) : []}
                            >
                                {classSearchList && classSearchList.length > 0 ?
                                    <>
                                        <MenuItem disableRipple>
                                            <FormControlLabel
                                                label={"All"}
                                                control={
                                                    <Checkbox
                                                        checked={classSearchList.filter(cls => cls.selected).length === classSearchList.length}
                                                        indeterminate={classSearchList.filter(cls => cls.selected).length > 0 && classSearchList.filter(cls => cls.selected).length !== classSearchList.length}
                                                        onChange={(e) => {
                                                            dispatch(handleChangeClassSearch({
                                                                type: 'all',
                                                                selected: e.target.checked
                                                            }))
                                                        }}
                                                    />
                                                }
                                            />
                                        </MenuItem>
                                        {classSearchList.map((cls, index) => (
                                            <MenuItem disableRipple>
                                                <FormControlLabel
                                                    sx={{ ml: 3 }}
                                                    label={cls.name}
                                                    control={
                                                        <Checkbox
                                                            checked={cls.selected}
                                                            onChange={(e) => {
                                                                dispatch(handleChangeClassSearch({
                                                                    index: index,
                                                                    selected: e.target.checked
                                                                }))
                                                            }}
                                                        />
                                                    }
                                                />
                                            </MenuItem>
                                        ))}
                                    </>
                                    : ""}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} >
                        <TextField placeholder="Start Date" label="Start Date" type="date"
                            sx={{ maxWidth: "98%" }}
                            value={dateStart}
                            onChange={e => {
                                dispatch(handleChangeDateStart(e.target.value))
                            }}
                            fullWidth size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} >
                        <TextField placeholder="End Date" label="End Date" type="date"
                            sx={{ maxWidth: "98%" }}
                            value={dateEnd}
                            onChange={e => {
                                dispatch(handleChangeDateEnd(e.target.value))
                            }}
                            fullWidth size="small" />
                    </Grid>
                </Grid>
                <Grid item xs={!2} md={12} sx={{
                    p: 2,
                    boxShadow: theme => theme.shadows[5],
                    background: theme => theme.palette.background.paper,
                    mb: 1
                }}>
                    {studentsList.length > 0 ?
                        <ExplicitTable columns={userRole === ROLES.superadmin ? TABLE_HEADS_SA : TABLE_HEADS} tableSize="small">
                            {studentsList.filter(std => {
                                if (nameSearch) {
                                    return std.name.toLowerCase().includes(nameSearch.toLowerCase())
                                } else {
                                    return std
                                }
                            }).filter(std => {
                                if (cnicSearch) {
                                    return std.cnic.includes(cnicSearch)
                                } else {
                                    return std
                                }
                            }).filter(std => {
                                if (classSearch.length > 0) {
                                    return classSearch.includes(std["class.name"])
                                } else {
                                    return std
                                }
                            }).filter(std => {
                                if (classSearch.length > 0 && contactSearch) {
                                    return std.phone_1.includes(contactSearch)
                                } else {
                                    return std
                                }
                            }).filter(std => {
                                if (classSearch.length > 0 && dateStart) {
                                    return new Date(std.createdAt).getTime() >= new Date(dateStart).getTime()
                                } else {
                                    return std
                                }
                            }).filter(std => {
                                if (classSearch.length > 0 && dateEnd) {
                                    return new Date(std.createdAt).getTime() <= new Date(dateEnd).getTime()
                                } else {
                                    return std
                                }
                            }).map(student => (
                                <StudentsTableRow tableActionButtons={tableActionButtons} student={student} key={student.id} />
                            ))}
                        </ExplicitTable>
                        : <NothingFound pageIcon={{
                            icon: Icons.School
                        }} pageTitle="Student" action={() => dispatch(handleChangeStudentModalOpen(true))} permission={addStudent} />}
                </Grid>
            </Grid>

            {/* <AddButtonCompoentn addStudent={addStudent} /> */}
            {addStudent &&
                <Tooltip placement="top" title="Add New Student">
                    <Fab color="primary" onClick={() => dispatch(handleChangeStudentModalOpen(true))} sx={{
                        position: "absolute",
                        right: 50,
                        bottom: 50
                    }}>
                        <Icons.Add />
                    </Fab>
                </Tooltip>}

            <AddStudentModal />

            {/* <Dialog dailogOpen={queryModalOpen} clickAwayListener={false} hasCloseIcon={true} title="Queries" handleClose={() => dispatch(handleChangeQueryModalOpen(false))} >
                <Queries id={id} />
            </Dialog> */}
        </Container>
    )
}


const AddStudentModal = () => {
    const { control, clearErrors, reset, setValue, handleSubmit, formState: { errors } } = useForm()
    const theme = useTheme()

    const [base64image, setBase64image] = React.useState(null)

    const [actionMenu, setActionMenu] = React.useState(null)
    const open = Boolean(actionMenu)

    const handleChange2Base64 = (file) => {
        try {
            if (file) {
                if (file.size > 1000000) {
                    throw new Error("Please upload a file smaller than 50 KB");
                }
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    setBase64image(reader.result)
                };
            } else {
                setBase64image(null)
            }
        } catch (err) {
            openErrorToast(err.message ? err.message : err)
        }
    }

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
    const classes = useSelector(getClassList)
    const father_cnic = useSelector(getStudentFatherCNIC)
    const cnic = useSelector(getStudentCNIC)
    const gender = useSelector(getStudentGender)

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
        setValue("father_cnic", father_cnic)
        setValue("cnic", cnic)
        setValue("gender", gender)
    }, [setValue, id, gender, name, father_name, email_address, phone_1, phone_2, phone_3, address, avatar, father_cnic, cnic, classId])
    return (
        <Dialog dailogOpen={modalOpen} clickAwayListener={false} size={"md"} hasCloseIcon={true} title="Student"
            handleClose={() => {
                dispatch(handleAddLoading())
                dispatch(handleChangeStudentModalOpen(false))
                clearErrors()
                reset()
                setBase64image(null)
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
                            let formData = new FormData()
                            formData.append("name", name)
                            formData.append("father_name", father_name)
                            formData.append("email_address", email_address)
                            formData.append("phone_1", phone_1)
                            formData.append("phone_2", phone_2)
                            formData.append("phone_3", phone_3)
                            formData.append("address", address)
                            formData.append("avatar", avatar)
                            formData.append("classId", classId)
                            formData.append("father_cnic", father_cnic)
                            formData.append("cnic", cnic)
                            formData.append("gender", gender)



                            dispatch(handleAddLoading())
                            id === null ? await postStudent(formData) :
                                await updateStudent(formData, id)
                            openSuccessToast("Record Added Successfully")
                            dispatch(handleChangeStudentModalOpen(false))
                            dispatch(handleResetStudentModal())
                            reset()
                            clearErrors()
                            setBase64image(null)
                            dispatch(studentsListRequested()).unwrap()
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
                            <FormControl required fullWidth size="small">
                                <InputLabel>Class</InputLabel>
                                <Select
                                    required
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
                                required
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
                                required
                                error={errors.father_name && !errors.father_name.touched && !errors.father_name.dirty}
                                helperText={errors.father_name && errors.father_name.message}
                                value={father_name}
                                onChange={e => {
                                    field.onChange(e)
                                    dispatch(handleChangeStudentFatherName(e.target.value))
                                }}
                                size="small"
                                label="Father / Husband / Custodian Name"
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
                    <TextField
                        value={email_address}
                        onChange={e => {
                            dispatch(handleChangeStudentEmailAddress(e.target.value))
                        }}
                        size="small"
                        label="Email Address"
                        fullWidth
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
                                value: /[0-9]{4}-[0-9]{7}/,
                                message: "Please enter 11 digits cell number in the format 03xx-xxxxxxx"
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                required
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
                    <TextField
                        value={father_cnic}
                        onChange={e => {
                            dispatch(handleChangeStudentFatherCNIC(e.target.value))
                        }
                        }
                        size="small"
                        label="Father NIC"
                        fullWidth
                    />
                </Grid>


                <Grid item xs={12} md={6} sx={{
                    mb: 2,
                    [theme.breakpoints.up("md")]: {
                        pl: 1
                    }
                }}>
                    <TextField
                        value={cnic}
                        onChange={e => {
                            dispatch(handleChangeStudentCNIC(e.target.value))
                        }
                        }
                        size="small"
                        label="NIC / Form B"
                        fullWidth
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
                }}>

                    <TextField
                        required
                        sx={{
                            p: 0
                        }}
                        value={gender}
                        onChange={e => {
                            dispatch(handleChangeStudentGender(e.target.value))
                        }}
                        size="small"
                        label="Gender"
                        fullWidth
                        select
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                    </TextField>
                </Grid>


                <Grid item xs={12} sx={{
                    mb: 2,
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
                                required
                                multiline
                                rows={2}
                                sx={{
                                    p: 0
                                }}
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
                    <MuiFileInput label={"Avatar"} fullWidth size="small" variant="outlined" value={avatar} onChange={(newFile) => {
                        dispatch(handleChangeStudentAvatar(newFile))
                        handleChange2Base64(newFile)
                    }
                    } />
                    <FormHelperText>Image should be less than 50KB in size (310px x 310px resolution recommended )</FormHelperText>
                </Grid>
            </Grid>
        </Dialog>

    )
}
export default Students
