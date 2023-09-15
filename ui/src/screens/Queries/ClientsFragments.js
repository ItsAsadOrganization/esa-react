import { Avatar, Box, Card, CardHeader, Divider, Grid, IconButton, List, MenuItem, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import { blue } from "@mui/material/colors"
import { useDispatch, useSelector } from 'react-redux'
import { getQueriesList, getStudentsList, handleChangeStudentId, queriesRequested } from "./querySlice"
import React from "react"
import { openErrorToast } from "../../common/toast"
import { handleAddLoading, handleRemoveLoading } from "../../common/commonSlice"
import Icons from "../../common/icons"

const UserFragment = ({ studentsList, id, name }) => {
    const dispatch = useDispatch()
    return (
        <>
            <Card component={MenuItem} onClick={e => {
                dispatch(handleChangeStudentId(id))
            }}>
                <CardHeader
                    sx={{
                        p: 0.5
                    }}
                    avatar={
                        <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                            {studentsList.find(s => s.id === id)?.name?.slice(0, 1)}
                        </Avatar>
                    }
                    title={studentsList.find(s => s.id === id)?.name}
                />
            </Card>
            <Divider sx={{ m: "0 !important" }} />
        </>
    )
}


const TabPanel = ({ queriesList, studentsList, value, index }) => {
    switch (value) {
        case 0:
            return (
                <>
                    {queriesList.filter(q => q.ended === false).length > 0 ?
                        queriesList.filter(q => q.ended === false).map(q => (
                            <>
                                <UserFragment studentsList={studentsList} id={q.studentId} key={q.id} name={q.name} />

                            </>
                        ))
                        : ""}
                </>
            )
            break;
        case 1:
            return (
                <>
                    {queriesList.filter(q => q.ended === true).length > 0 ?
                        queriesList.filter(q => q.ended === true).map(q => (
                            <UserFragment studentsList={studentsList} id={q.studentId} key={q.id} name={q.name} />
                        ))
                        : ""}
                </>
            )
            break;

        default:
            break;
    }
}
const ClientsFragments = () => {
    const queriesList = useSelector(getQueriesList)
    const studentsList = useSelector(getStudentsList)

    const [active, setActive] = React.useState(0)
    const [queries, setQueries] = React.useState([])

    const dispatch = useDispatch()

    const loadQueries = async () => {
        try {
            dispatch(handleAddLoading())
            await dispatch(queriesRequested()).unwrap()
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
            console.log(queriesList.length)
            let queries = []
            const groups = queriesList.reduce((groups, game) => {
                const date = game.createdAt.split('T')[0];
                if (!groups[date]) {
                    groups[date] = [];
                }
                if (Array.isArray(queries) && queries.length > 0) {
                    if (queries.filter(g => g.date === date).length > 0) {
                        const index = queries.findIndex(g => g.date === date)
                        queries[index].queries = [...queries[index].queries, game]
                    } else {
                        queries.push({ date, queries: [game] })
                    }
                } else {
                    queries.push({ date, queries: [game] })
                }
                groups[date].push(game);
                return groups
            }, {});

            setQueries(queries)
        }
    }, [queriesList])

    return (
        <Grid item xs={!2} md={3} lg={2} sm={4} sx={{
            boxShadow: theme => theme.shadows[5],
            background: theme => theme.palette.background.paper,
        }}>
            <Toolbar sx={{
                background: "#13294e",
                color: "#fff",
                px: "10px !important",
            }}>

                <Typography sx={{
                    fontWeight: 700,
                    ml: 1
                }}>Clients</Typography>
            </Toolbar>
            <Box
                component={List}
                sx={{
                    maxHeight: theme => `calc(100vh - ${theme.mixins.toolbar.minHeight}px  - 25px)`,
                    minHeight: theme => `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 25px)`,
                    overflow: "auto",
                    '::-webkit-scrollbar': {
                        width: '5px'
                    },
                    '::-webkit-scrollbar-track': {
                        background: '#f1f1f1'
                    },
                    '::-webkit-scrollbar-thumb': {
                        background: '#888'
                    },
                    '::-webkit-scrollbar-thumb:hover': {
                        background: '#555'
                    },
                }}>
                <Tabs variant="fullWidth"
                    value={active}
                    onChange={(e, newValue) => {
                        setActive(newValue)
                    }}
                    indicatorColor="secondary"
                    textColor="inherit"
                >
                    <Tab label="Active" value={0} />
                    <Tab label="Spam" value={1} />
                </Tabs>
                {console.log({queries})}
                {queries.length > 0 ?
                    queries.map(query => (
                        query.queries.filter(q => {
                            if(active === 0){
                                return q.ended === false
                            }else{
                                return q.ended === true
                            }
                        }).length > 0 ? (
                            <>
                                <Typography>{query.date}</Typography>
                                <TabPanel queriesList={query.queries} studentsList={studentsList} index={0} value={active} />
                            </>
                        ) : ""
                    ))
                    : <Box sx={{
                        margin: "auto",
                        marginTop: "50%",
                        maxWidth: "fit-content",
                        textAlign: "center"
                    }}>
                        <Icons.SpeakerNotesOff sx={{
                            color: theme => theme.palette.customFontColor.light,
                            fontSize: "3.5em"
                        }} />
                        <Typography sx={{
                            fontWeight: 700,
                            color: theme => theme.palette.customFontColor.light
                        }}>No Active Queries</Typography>
                    </Box>}

            </Box>
        </Grid>
    )
}
export default ClientsFragments