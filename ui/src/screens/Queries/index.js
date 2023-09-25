import { Box, Button, Checkbox, Chip, Container, Fab, FormControl, FormControlLabel, Grid, Icon, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import React from "react"
import AppBreadCrumbs from "../../components/BreadCrumbs"
import { BREADCRUMBS } from "./constants"
import ExplicitTable, { StyledTableCell, StyledTableRow } from "../../components/ExplicitTable"
import Icons from "../../common/icons"
import { useDispatch, useSelector } from "react-redux"
import { handleAddLoading, handleRemoveLoading } from "../../common/commonSlice"
import { getQueriesList, getQueryConfig, getQueryForm, getQueryModalOpen, getQueryStudentName, getQueryStudentPhone, handleChangeQueryConfig, handleChangeQueryFormComment, handleChangeQueryFormContactMedium, handleChangeQueryModalOpen, handleChangeQueryStudentName, handleChangeQueryStudentPhone, handleResetQueryModal, queryiesListRequested } from "./querySlice"
import { openErrorToast } from "../../common/toast"
import Dialog from "../../components/Dialog"
import { delQueryApi, postQueryApi, putQueryApi } from "../../api"
import { getUserId, getUserName } from "../Login/loginSlice"
import useCan from "../../hooks/useCan"

const Queries = () => {
    const dispatch = useDispatch()
    const queriesList = useSelector(getQueriesList)
    const queryModalOpen = useSelector(getQueryModalOpen)
    const queryForm = useSelector(getQueryForm)
    const name = useSelector(getQueryStudentName)
    const phone = useSelector(getQueryStudentPhone)
    const myId = useSelector(getUserId)
    const queryConfig = useSelector(getQueryConfig)
    const [userColor, setUserColor] = React.useState([])
    const [studentId, setStudentId] = React.useState(null)


    const [nameSearch, setNameSearch] = React.useState("")
    const [phSearch, setPhSearch] = React.useState("")
    const [dateSearch, setDateSearch] = React.useState(null)
    const [clSearch, setClSearch] = React.useState([])

    const loadQueries = () => {
        try {
            dispatch(handleAddLoading())
            dispatch(queryiesListRequested()).unwrap()
            dispatch(handleRemoveLoading())
        } catch (err) {
            dispatch(handleRemoveLoading())
            openErrorToast(err.message ? err.message : err)
        }
    }
    React.useEffect(() => {
        loadQueries()
    }, [])

    React.useEffect(() => {
        if (queriesList.length > 0) {
            setUserColor([...new Set(queriesList.map(ql => ({ selected: true, user: ql.user.name, color: "hsl(" + Math.random() * 270 + ", 30%, 50%)" })))])
            setClSearch([...new Set(queriesList.map(ql => ({ selected: true, name: ql.user.name })))])
        }
    }, [queriesList])

    const actionButtonArray = [{
        label: "Edit",
        icon: Icons.BorderColor,
        visibility: useCan("QueriesUpdateQueries"),
        color: "info",
        action: (query) => {
            setStudentId(query.id)
            dispatch(handleChangeQueryStudentName(query.student_name))
            dispatch(handleChangeQueryStudentPhone(query.phone_number))
            dispatch(handleChangeQueryModalOpen(true))
            dispatch(handleChangeQueryConfig(query.config))
        }
    }, {
        label: "Delete",
        icon: Icons.Delete,
        color: "error",
        visibility: useCan("QueriesDeleteQueries"),
        action: async (query) => {
            try {
                dispatch(handleAddLoading())
                await delQueryApi({ id: query.id })
                loadQueries()
                dispatch(handleRemoveLoading())
            } catch (err) {
                dispatch(handleRemoveLoading())
                openErrorToast(err.message ? err.message : err)
            }
        }
    }]

    return (
        <Container maxWidth="xl">
            <AppBreadCrumbs pageTitle={"Queries"} paths={BREADCRUMBS} />
            <Grid container maxWidth="xl" sx={{
                p: 2,
                boxShadow: theme => theme.shadows[5],
                background: theme => theme.palette.background.paper,
                mb: 1
            }} >
                <Grid item xs={!2} md={3} >
                    <TextField fullWidth
                        value={nameSearch} onChange={e => setNameSearch(e.target.value)}
                        InputProps={
                            { startAdornment: <Icons.Search sx={{ mr: 1 }} /> }
                        }
                        placeholder="Search By Student Name"
                        sx={{ maxWidth: '96%' }} size="small" />
                </Grid>
                <Grid item xs={!2} md={3} >
                    <TextField
                        value={phSearch} onChange={e => setPhSearch(e.target.value)}
                        InputProps={
                            { startAdornment: <Icons.Search sx={{ mr: 1 }} /> }
                        }
                        placeholder="Search By Phone Number" fullWidth sx={{ maxWidth: '96%' }} size="small" />
                </Grid>

                <Grid item xs={12} md={3} >
                    <FormControl fullWidth size="small" sx={{ maxWidth: "98%" }}>
                        <InputLabel id="demo-multiple-chip-label">Coordinated By</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            renderValue={(selected) => (
                                selected.length === clSearch.length ? <Chip size="small" label={"All"} /> : <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip size="small" key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            fullWidth
                            value={clSearch.filter(cls => cls.selected).length > 0 ? clSearch.filter(cls => cls.selected).map(cls => cls.name) : []}
                        >
                            {clSearch && clSearch.length > 0 ?
                                <>
                                    <MenuItem disableRipple>
                                        <FormControlLabel
                                            label={`All (${queriesList.filter(ql => {
                                                if (dateSearch) {
                                                    return new Date(ql.createdAt).toDateString() === new Date(dateSearch).toDateString()
                                                } else {
                                                    return ql
                                                }
                                            }).length})`}
                                            control={
                                                <Checkbox
                                                    checked={clSearch.filter(cls => cls.selected).length === clSearch.length}
                                                    indeterminate={clSearch.filter(cls => cls.selected).length > 0 && clSearch.filter(cls => cls.selected).length !== clSearch.length}
                                                    onChange={(e) => {
                                                        setClSearch(clSearch.map(cl => ({ ...cl, selected: e.target.checked })))
                                                    }}
                                                />
                                            }
                                        />
                                    </MenuItem>
                                    {clSearch.map((cls, index) => (
                                        <MenuItem disableRipple>
                                            <FormControlLabel
                                                sx={{ ml: 3 }}
                                                label={`${cls.name} (${queriesList.filter(q => q.user.name.toLowerCase() === cls.name.toLowerCase()).filter(ql => {
                                                    if (dateSearch) {
                                                        return new Date(ql.createdAt).toDateString() === new Date(dateSearch).toDateString()
                                                    } else {
                                                        return ql
                                                    }
                                                }).length})`}
                                                control={
                                                    <Checkbox
                                                        checked={cls.selected}
                                                        onChange={(e) => {
                                                            let _cl = [...clSearch]
                                                            console.log({ _cl })
                                                            _cl[index].selected = e.target.checked
                                                            setClSearch(_cl)
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

                <Grid item xs={!2} md={3} >
                    <TextField type="date" value={dateSearch} onChange={e => setDateSearch(e.target.value)} label="Date Created" fullWidth sx={{ maxWidth: '96%' }} size="small" />
                </Grid>
            </Grid>
            <Grid container maxWidth="xl" >
                <Grid item xs={!2} md={12} sx={{
                    p: 2,
                    boxShadow: theme => theme.shadows[5],
                    background: theme => theme.palette.background.paper,
                    mb: 1
                }}>
                    <ExplicitTable tableSize="small" columns={[{ name: "Student Name" }, { name: "Phone Number" }, { name: "Coordinated By" }, { name: "Date Created" }, { name: "Actions", align: "right" }]}>
                        {queriesList.length > 0 ?
                            queriesList.filter(ql => {
                                if (nameSearch) {
                                    return ql.student_name.toLowerCase().includes(nameSearch.toLowerCase())
                                } else {
                                    return ql
                                }
                            }).filter(ql => {
                                if (phSearch) {
                                    return ql.phone_number.toLowerCase().includes(phSearch.toLowerCase())
                                } else {
                                    return ql
                                }
                            }).filter(ql => {
                                if (dateSearch) {
                                    return new Date(ql.createdAt).toDateString() === new Date(dateSearch).toDateString()
                                } else {
                                    return ql
                                }
                            })
                            .filter(ql => {
                                if ([...new Set(clSearch.filter(cl => cl.selected).map(cl => cl.name))].length > 0) {
                                    return [...new Set(clSearch.filter(cl => cl.selected).map(cl => cl.name.toLowerCase()))].includes(ql.user.name.toLowerCase())
                                } else {
                                    return ql
                                }
                            }).map(query => (
                                <StyledTableRow>
                                    <StyledTableCell >
                                        {query.student_name}
                                    </StyledTableCell>
                                    <StyledTableCell>{query.phone_number}</StyledTableCell>
                                    <StyledTableCell sx={{ fontWeight: 700, color: userColor.find(c => c.user.toLowerCase() === query.user.name.toLowerCase())?.color }}>{query.user.name}</StyledTableCell>
                                    <StyledTableCell > {new Date(query.createdAt).getDate() + "-" + (new Date(query.createdAt).getMonth() + 1) + "-" + new Date(query.createdAt).getFullYear()}</StyledTableCell>
                                    <StyledTableCell sx={{ textAlign: "right" }}>
                                        {actionButtonArray.filter(btn => btn.visibility).map(btn => (
                                            <IconButton onClick={() => btn.action(query)} color={btn.color}>
                                                <btn.icon />
                                            </IconButton>
                                        ))}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                            : ""}
                    </ExplicitTable>
                </Grid>
            </Grid>
            {useCan("QueriesAddQueries") &&
                <Fab onClick={e => {
                    dispatch(handleChangeQueryModalOpen(true))
                }} color="primary" sx={{
                    position: "absolute",
                    right: 50,
                    bottom: 50
                }}>
                    <Icons.Add />
                </Fab>
            }

            <Dialog dailogOpen={queryModalOpen} title="Query" clickAwayListener={false} size={"md"} hasCloseIcon={true} handleClose={() => {
                dispatch(handleResetQueryModal())
                dispatch(handleChangeQueryStudentName(''))
                dispatch(handleChangeQueryStudentPhone(''))
            }}
                actionsButtonArray={[{
                    label: "Save",
                    variant: "contained",
                    color: "primary",
                    size: "small",
                    action: async () => {
                        try {
                            dispatch(handleAddLoading())
                            studentId === null ? await postQueryApi({
                                student_name: name,
                                phone_number: phone,
                                config: [{
                                    comment: queryForm.comment,
                                    contact_medium: queryForm.contact_medium,
                                }],
                                userId: myId
                            }) : await putQueryApi({
                                id: studentId,
                                student_name: name,
                                phone_number: phone,
                                config: [...queryConfig, {
                                    comment: queryForm.comment,
                                    contact_medium: queryForm.contact_medium,
                                }],
                                userId: myId
                            })
                            dispatch(handleChangeQueryStudentName(''))
                            dispatch(handleChangeQueryStudentPhone(''))
                            dispatch(handleResetQueryModal())
                            loadQueries()
                            dispatch(handleRemoveLoading())
                        } catch (err) {
                            dispatch(handleRemoveLoading())
                            openErrorToast(err.message ? err.message : err)
                        }
                    }
                }]}
            >
                {studentId === null ? <Grid container>
                    <Grid item xs={12} sx={{ margin: "auto", mb: 2 }}>
                        <TextField value={name} onChange={e => {
                            dispatch(handleChangeQueryStudentName(e.target.value))
                        }} sx={{ width: '98%' }} label="Student Name" fullWidth size="small" />
                    </Grid>

                    <Grid item xs={12} sx={{ margin: "auto", mb: 2 }}>
                        <TextField onChange={e => {
                            dispatch(handleChangeQueryStudentPhone(e.target.value))
                        }} value={phone} sx={{ width: '98%' }} label="Phone Number" fullWidth size="small" />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <TextField value={queryForm.comment}
                            onChange={e => {
                                dispatch(handleChangeQueryFormComment(e.target.value))
                            }}
                            sx={{ maxWidth: '98%' }} label="Comment" fullWidth size="small" />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <TextField value={queryForm.contact_medium}
                            onChange={e => {
                                dispatch(handleChangeQueryFormContactMedium(e.target.value))
                            }} sx={{ maxWidth: '98%' }} label="Communication Medium" fullWidth size="small" />
                    </Grid>

                </Grid> : <>
                    <Grid container>
                        <Grid item xs={8} sx={{ mb: 2 }}>
                            <TextField value={queryForm.comment}
                                onChange={e => {
                                    dispatch(handleChangeQueryFormComment(e.target.value))
                                }}
                                sx={{ maxWidth: '98%' }} label="Comment" fullWidth size="small" />
                        </Grid>
                        <Grid item xs={4} sx={{ mb: 2 }}>
                            <TextField value={queryForm.contact_medium}
                                onChange={e => {
                                    dispatch(handleChangeQueryFormContactMedium(e.target.value))
                                }} sx={{ maxWidth: '98%' }} label="Communication Medium" fullWidth size="small" />
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{
                                boxShadow: theme => theme.shadows[5],
                                p: 1,
                                maxHeight: 250
                            }}>
                                <ExplicitTable tableSize="small" columns={[{ name: "Comment" }, { name: "Communication Medium" }]}>
                                    {queryConfig.length > 0 ?
                                        queryConfig.map(query => (
                                            <StyledTableRow>
                                                <StyledTableCell sx={{ width: "70%" }}>{query.comment}</StyledTableCell>
                                                <StyledTableCell sx={{ width: "30%" }}>{query.contact_medium}</StyledTableCell>
                                            </StyledTableRow>
                                        ))
                                        : ""}
                                </ExplicitTable>
                            </Box>
                        </Grid>
                    </Grid>

                </>

                }
            </Dialog>
        </Container>
    )
}

export default Queries