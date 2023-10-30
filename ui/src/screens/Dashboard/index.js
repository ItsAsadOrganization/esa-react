import { Alert, Avatar, Box, Card, CardHeader, Container, Grid, IconButton, Snackbar, Stack, Toolbar, Typography } from '@mui/material'
import AppBreadCrumbs from '../../components/BreadCrumbs';
import NothingFound from '../../components/NothingFound';
import Icons from '../../common/icons';
import { BREADCRUMBS } from './constants';
import { useDispatch, useSelector } from 'react-redux'
import { getNotifications, handleAddLoading, handleRemoveLoading } from '../../common/commonSlice';
import React from 'react';
import { APP_ROUTES } from '../../Layout/Navigation/constants';
import ProtectedRoute from '../../Layout/Navigation/ProtectedRoute';
import { getUserPermissions } from '../Login/loginSlice';
import { Link } from 'react-router-dom';
import ExplicitTable, { StyledTableCell, StyledTableRow } from '../../components/ExplicitTable';
import { useTheme } from '@emotion/react';
import { expiringVouchersRequested, getExpiringVouchersList, getQueriesList, getStudentsList, queryiesListRequested, studentsListRequested } from './dashboardSlice';
import { openErrorToast } from '../../common/toast';
import TwoBarChart from '../../components/TwoBarChart';
import BarChart from '../../components/BarChart';

const Dashboard = () => {
    const notifications = useSelector(getNotifications)
    const userPermissions = useSelector(getUserPermissions);
    const theme = useTheme()
    const dispatch = useDispatch()
    const queriesList = useSelector(getQueriesList)
    const studentsList = useSelector(getStudentsList)
    const expiringVouchersList = useSelector(getExpiringVouchersList)
    const [queryChartData, setQueryChartData] = React.useState([])
    const [clsChartData, setClsChartData] = React.useState([])

    const loadDashboardStats = async () => {
        try {
            dispatch(handleAddLoading())
            await dispatch(queryiesListRequested({})).unwrap()
            await dispatch(studentsListRequested()).unwrap()
            await dispatch(expiringVouchersRequested()).unwrap()
            dispatch(handleRemoveLoading())
        } catch (err) {
            dispatch(handleRemoveLoading())
            openErrorToast(err.message ? err.message : err)
        }
    }
    React.useEffect(() => {
        loadDashboardStats()
    }, [])


    React.useEffect(() => {
        if (queriesList.length > 0) {
            let setOfDates = [...new Set(queriesList.map(q => new Date(q.createdAt).toISOString().split('T')[0]))]
            let __data = setOfDates.map(dt => {
                return {
                    name: dt,
                    matured: queriesList.filter(ql => (new Date(ql.createdAt).toISOString().split('T')[0] === dt) && ql.is_matured).length,
                    ammatured: queriesList.filter(ql => (new Date(ql.createdAt).toISOString().split('T')[0] === dt) && !ql.is_matured).length
                }
            })
            setQueryChartData(__data)
        }
    }, [queriesList])

    React.useEffect(() => {
        if (studentsList.length > 0) {
            let classes = [...new Set(studentsList.map(q => q["class.name"]))]
            let __data = classes.map(dt => {
                return {
                    name: dt,
                    strength: studentsList.filter(std => std["class.name"] === dt).length,
                }
            })
            setClsChartData(__data)
        }
    }, [queriesList])


    return (
        <Container maxWidth="xl">
            <Grid container gap={1.5} sx={{ mb: 1.5 }}>
                {
                    APP_ROUTES.filter(route => {
                        return route.label !== "dashboard" && Object.keys(userPermissions).includes(route.permission) && route.showInNav
                    }).map(route =>
                        <Grid component={Link} to={route.url} item xs={12} sm={6} md={1.5} sx={{
                            transition: ".5s all ease-in-out",
                            color: "#000", textDecoration: "none", textAlign: "center", background: theme => theme.palette.mode === "dark" ? "hsl(" + Math.random() * 360 + ", 100%, 75%)" : "hsl(" + Math.random() * 360 + ", 20%, 75%)", p: 2,
                            '&:hover': {
                                transition: ".1s all ease-in-out",
                                borderRadius: 3,
                                boxShadow: theme => theme.shadows[5]
                            }
                        }}>
                            <route.icon sx={{ width: 48, height: 48 }} />
                            <Typography sx={{ fontWeight: 600 }}>{route.label.charAt(0).toUpperCase() + route.label.slice(1)}</Typography>
                        </Grid>
                    )

                }
            </Grid>

            <Grid container sx={{ mb: 1.5 }}>
                <Grid item xs={12} sm={8} >
                    <Box sx={{
                        maxWidth: '93%', boxShadow: theme => theme.shadows[5],
                        background: theme => theme.palette.background.paper,
                        mb: 1,
                        px: 3,
                        py: 1.5,
                        maxHeight: 'fit-content',
                        minHeight: 0,
                    }}>
                        <Toolbar sx={{
                            p: '0 !important',
                        }}>
                            <Typography sx={{ flexGrow: 1 }}>Recently Added Students</Typography>
                            <IconButton size='small'>
                                <Icons.Autorenew />
                            </IconButton>
                        </Toolbar>
                        <Box>
                            <ExplicitTable tableSize="small" columns={[
                                { name: "Avatar" },
                                { name: "Name" },
                                { name: "Class" },
                            ]}>
                                {studentsList.length > 0 && studentsList.filter((item, idx) => (idx < 7)).map(std => (
                                    <StyledTableRow key={std.id}>
                                        <StyledTableCell>
                                            {
                                                !std.avatar ? <Avatar>{std.name.charAt(0)}</Avatar> : <Avatar src={`${window.location.protocol}//${window.location.hostname}:3502/` + std.avatar} />
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell> {std.name} </StyledTableCell>
                                        <StyledTableCell> {std["class.name"]}  </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </ExplicitTable>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={4} sx={{ mb: 1 }} >
                    <Box sx={{
                        boxShadow: theme => theme.shadows[5],
                        background: theme => theme.palette.background.paper,
                        mb: 1,
                        px: 3,
                        py: 1.5,
                        maxHeight: 'fit-content',
                        minHeight: 0,
                    }}>
                        <Toolbar sx={{
                            p: '0 !important',
                        }}>
                            <Typography sx={{ flexGrow: 1 }}>Recently Added Queries</Typography>
                            <IconButton size='small'>
                                <Icons.Autorenew />
                            </IconButton>
                        </Toolbar>
                        <Box>
                            <Box>

                                {queriesList.length > 0 && queriesList.filter((item, idx) => (idx < 5)).map(std => (
                                    <Card sx={{ mb: 1.25 }} >
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="recipe">
                                                    {std.student_name.charAt(0)}
                                                </Avatar>
                                            }
                                            action={
                                                `${new Date(std.createdAt).getDate()}-${new Date(std.createdAt).getMonth() + 1}-${new Date(std.createdAt).getFullYear()}`
                                            }
                                            title={std.student_name}
                                            subheader={<><b>Coordinated By:</b> {std.user.name}</>}
                                        />
                                    </Card>
                                ))}
                            </Box>

                        </Box>

                    </Box>
                </Grid>
            </Grid>


            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4} >
                    <Box sx={{
                        boxShadow: theme => theme.shadows[5],
                        background: theme => theme.palette.background.paper,
                        mb: 1,
                        px: 3,
                        py: 1.5,
                        maxHeight: 500,
                        minHeight: 268,
                    }}>
                        <Toolbar sx={{
                            p: '0 !important',
                        }}>
                            <Typography sx={{ flexGrow: 1 }}>Recently Matured</Typography>
                            <IconButton size='small'>
                                <Icons.Autorenew />
                            </IconButton>
                        </Toolbar>
                        {queriesList.length > 0 ?
                            <ExplicitTable tableSize="small" columns={[
                                { name: "Id" },
                                { name: "Student Name" },
                            ]}>
                                {
                                    queriesList.filter(q => q.is_matured).length > 0 ?
                                        queriesList.filter(q => q.is_matured).map(exp => (
                                            <StyledTableRow key={exp.id}>
                                                <StyledTableCell >{exp.code}</StyledTableCell>
                                                <StyledTableCell >{exp.student_name}</StyledTableCell>
                                            </StyledTableRow>
                                        )) : <StyledTableRow>
                                            <StyledTableCell colSpan={2} sx={{ height: 150, textAlign: "center" }} >No Matured Students</StyledTableCell>
                                        </StyledTableRow>

                                }
                            </ExplicitTable>
                            : ""}
                    </Box>
                </Grid>

                <Grid item xs={12} sm={8} >
                    <Box sx={{
                        boxShadow: theme => theme.shadows[5],
                        background: theme => theme.palette.background.paper,
                        mb: 1,
                        px: 3,
                        py: 1.5,
                        maxHeight: 'fit-content',
                        minHeight: 0,
                    }}>
                        <Toolbar sx={{
                            p: '0 !important',
                        }}>
                            <Typography sx={{ flexGrow: 1 }}>Expired Vouchers</Typography>
                            <IconButton size='small'>
                                <Icons.Autorenew />
                            </IconButton>
                        </Toolbar>
                        {expiringVouchersList.length > 0 ?
                            <ExplicitTable tableSize="small" columns={[
                                { name: "Voucher Id" },
                                { name: "Student Name" },
                                { name: "Date Expiry" },
                            ]}>
                                {
                                    expiringVouchersList.map(exp => (
                                        <StyledTableRow key={exp.id}>
                                            <StyledTableCell >{exp.voucher_id}</StyledTableCell>
                                            <StyledTableCell >{studentsList.find(std => std.id === exp.studentId).name}</StyledTableCell>
                                            <StyledTableCell >{exp.date_expiry}</StyledTableCell>
                                        </StyledTableRow>
                                    ))

                                }
                            </ExplicitTable>
                            : ""}
                    </Box>
                </Grid>
            </Grid>



            <Grid container spacing={2} sx={{ mb: 1.5 }}>
                <Grid item xs={12} sm={6} >

                    <Box sx={{
                        boxShadow: theme => theme.shadows[5],
                        background: theme => theme.palette.background.paper,
                        mb: 1,
                        px: 3,
                        py: 1.5,
                        maxHeight: 'fit-content',
                        minHeight: 0,
                    }}>
                        <Toolbar sx={{
                            p: '0 !important',
                        }}>
                            <Typography sx={{ flexGrow: 1 }}>Students Matured</Typography>
                            <IconButton size='small'>
                                <Icons.Autorenew />
                            </IconButton>
                        </Toolbar>
                        <TwoBarChart data={queryChartData} dataKey1={"matured"} dataKey2={"ammatured"} />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6} >

                    <Box sx={{
                        boxShadow: theme => theme.shadows[5],
                        background: theme => theme.palette.background.paper,
                        mb: 1,
                        px: 3,
                        py: 1.5,
                        maxHeight: 'fit-content',
                        minHeight: 0,
                    }}>
                        <Toolbar sx={{
                            p: '0 !important',
                        }}>
                            <Typography sx={{ flexGrow: 1 }}>Class Strength</Typography>
                            <IconButton size='small'>
                                <Icons.Autorenew />
                            </IconButton>
                        </Toolbar>
                        <BarChart data={clsChartData} dataKey1={"strength"} />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Dashboard;