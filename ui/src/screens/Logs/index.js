import { Box, Chip, Collapse, Container, Grid, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material"
import AppBreadCrumbs from "../../components/BreadCrumbs"
import { BREADCRUMBS } from "./constants"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLoadings, handleAddLoading, handleRemoveLoading } from "../../common/commonSlice"
import { getLogsList, handeResetSlice, logsRequested } from "./logSlice"
import Icons from "../../common/icons"
import { BASE_URL } from "../../api/constants"
import JsonView from '@uiw/react-json-view';
import { openErrorToast } from "../../common/toast"
import { getLogsApi } from "../../api"
import NothingFound from "../../components/NothingFound"
import { useTheme } from "@emotion/react"

const Logs = () => {
    const dispatch = useDispatch()
    // const logsList = useSelector(getLogsList)
    const theme = useTheme()
    const [logsList, setLogsList] = React.useState([])
    const [open, setOpen] = React.useState({
        expand: false,
        id: null
    })
    const loadLogs = async () => {
        try {
            dispatch(handleAddLoading())
            const { data } = await getLogsApi()
            setLogsList(data.logs)
            dispatch(handleRemoveLoading())

        } catch (err) {
            openErrorToast(err.message ? err.message : err)
        }
    }

    React.useEffect(() => {
        loadLogs()
        return () => {
            dispatch(handeResetSlice())
        }
    }, [])
    return (
        <Container maxWidth="xl">
            <AppBreadCrumbs pageTitle={"Sytem Logs"} paths={BREADCRUMBS} />
            <Grid container maxWidth="xl" >
                <Grid item xs={!2} md={12} sx={{
                    p: 2,
                    boxShadow: theme => theme.shadows[5],
                    background: theme => theme.palette.background.paper,
                    mb: 1
                }}>
                    <List>
                        {logsList.length > 0 ?
                            logsList.map((log, index) => (
                                <Box key={index} sx={{
                                    mb: 1.5,
                                    border: theme => `1px solid ${theme.palette.customFontColor.main}`,
                                }}>
                                    <ListItemButton disableRipple
                                        onClick={e => {
                                            dispatch(handleAddLoading())
                                            if (open.expand && open.id === index) {
                                                setOpen({
                                                    expand: false,
                                                    id: null
                                                })
                                            }
                                            else {
                                                setOpen({
                                                    expand: true,
                                                    id: index
                                                })
                                            }
                                            dispatch(handleRemoveLoading())
                                        }}>
                                        <ListItemIcon>
                                            <Chip label={log.req_config.method} color={log.req_config.method.toLowerCase() === "get" ? "info" :

                                                log.req_config.method.toLowerCase() === "put" ? "warning" :
                                                    log.req_config.method.toLowerCase() === "delete" ? "error" : "success"
                                            } size="small" sx={{ width: 80, py: 1.5, borderRadius: 1 }} />
                                        </ListItemIcon>
                                        <ListItemText sx={{
                                            pl: 1.5,
                                            color: theme => theme.palette.customFontColor.main
                                        }}>
                                            {BASE_URL + log.req_config.url}
                                            <Chip size="small" color="success" sx={{ px: 2, ml: 2, borderRadius: 0 }} label={"Response Status " + log.res_config.statusCode} />
                                        </ListItemText>
                                        {(open.expand && open.id === index) ? <Icons.ExpandLess sx={{
                                            color: theme => theme.palette.customFontColor.main
                                        }} /> : <Icons.ExpandMore sx={{
                                            color: theme => theme.palette.customFontColor.main
                                        }} />}
                                    </ListItemButton>
                                    <Collapse in={open.id === index} sx={{
                                        px: 3,
                                        py: 1.5
                                    }} timeout="auto" unmountOnExit>
                                        <Grid container>
                                            <Grid xs={12} sx={{ mb: 2 }}>
                                                <Stack display={"flex"} flexDirection={"row"} gap={2} >
                                                    <Typography sx={{ width: 80, fontWeight: 700,  color: theme => theme.palette.customFontColor.main }}>Query</Typography>
                                                    <JsonView indentWidth={4} collapsed={1} displayDataTypes={false} enableClipboard={false} value={log.req_config.query}
                                                        style={{ flexGrow: 1, width: "100%", border: `1px solid ${theme.palette.primary.main}`, padding: "10px" }} />
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} sx={{ mb: 2 }}>
                                                <Stack display={"flex"} flexDirection={"row"} gap={2} >
                                                    <Typography sx={{ width: 80,fontWeight: 700, color: theme => theme.palette.customFontColor.main }}>Body</Typography>
                                                    <JsonView indentWidth={4} collapsed={1} displayDataTypes={false} enableClipboard={false} value={log.req_config.body} style={{ flexGrow: 1, width: "100%", border: `1px solid ${theme.palette.primary.main}`, padding: "10px" }} />
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} sx={{ mb: 2 }}>
                                                <Stack display={"flex"} flexDirection={"row"} gap={2} >
                                                    <Typography sx={{ width: 80, fontWeight: 700,color: theme => theme.palette.customFontColor.main }}>Response</Typography>
                                                    <JsonView indentWidth={4} collapsed={1} displayDataTypes={false} enableClipboard={false} value={log.res_config} style={{ flexGrow: 1, width: "100%", border: `1px solid ${theme.palette.primary.main}`, padding: "10px" }} />
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Collapse>
                                </Box>
                            )) :
                            <NothingFound pageIcon={{
                                icon: Icons.Timeline
                            }} pageTitle="System Logs" action={() => { }} />}
                    </List>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Logs