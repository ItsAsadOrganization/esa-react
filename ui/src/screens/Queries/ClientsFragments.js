import { Avatar, Box, Card, CardHeader, Divider, Grid, IconButton, List, MenuItem, Toolbar, Typography } from "@mui/material"
import { blue } from "@mui/material/colors"
import { useDispatch, useSelector } from 'react-redux'
import { getQueriesList, getStudentsList, handleChangeStudentId, queriesRequested } from "./querySlice"
import React from "react"
import { openErrorToast } from "../../common/toast"
import { handleAddLoading, handleRemoveLoading } from "../../common/commonSlice"

const UserFragment = ({ id, name }) => {
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
                            {name.slice(0, 1)}
                        </Avatar>
                    }
                    title={name}
                // subheader="September 14, 2016"
                />
            </Card>
            <Divider sx={{ m: "0 !important" }} />
        </>
    )
}

const ClientsFragments = () => {
    const queriesList = useSelector(getQueriesList)

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

    return (
        <Grid item xs={!2} md={3} sx={{
            boxShadow: theme => theme.shadows[5],
            background: theme => theme.palette.background.paper,
        }}>
            <Toolbar sx={{
                background: "#13294e",
                color: "#fff",
                px: "10px !important",
            }}>
                {/* <Icons.Close /> */}
                <Typography sx={{
                    fontWeight: 700,
                    ml: 1
                }}>Clients</Typography>
            </Toolbar>
            <Box
                component={List}
                sx={{
                    maxHeight: theme => `calc(100vh - ${theme.mixins.toolbar.minHeight * 2}px - ${theme.mixins.toolbar.minHeight}px)`,
                    minHeight: theme => `calc(100vh - ${theme.mixins.toolbar.minHeight * 2}px - ${theme.mixins.toolbar.minHeight}px)`,
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
                {queriesList.length > 0 ?
                    queriesList.map(q => (
                        <UserFragment id={q.id} key={q.id} name={q.name} />
                    ))
                    : "Nothing found"}
            </Box>
        </Grid>
    )
}
export default ClientsFragments