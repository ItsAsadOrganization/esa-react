import { Avatar, Box, Button, Container, Divider, Grid, MenuItem, Typography } from "@mui/material"
import AppBreadCrumbs from "../../components/BreadCrumbs"
import { BREADCRUMBS } from './constants'
import { useSelector } from "react-redux"
import { getNotifications } from "../../common/commonSlice"
import { updateNotyApi } from "../../api"
import { openErrorToast } from "../../common/toast"
import Icons from "../../common/icons"

const Notifications = () => {

    const notifications = useSelector(getNotifications)
    return (
        <Container maxWidth="xl">
            <AppBreadCrumbs pageTitle={"Notifications"} paths={BREADCRUMBS} />
            <Grid container maxWidth="xl" >

                {notifications.length > 0 ? <>
                    {notifications.map((n, i) => (
                        <Grid key={i} component={Button} item container xs={!2} md={12} sx={{
                            p: 2,
                            boxShadow: theme => theme.shadows[5],
                            // background: theme => theme.palette.background.paper,
                            mb: 1,
                            bgcolor: theme => !n.is_read ? theme.palette.info.main : theme.palette.background.paper,
                            color: theme => n.is_read ? "inherit" : theme.palette.background.paper,
                            '&:hover': {
                                color: '#000'
                            }
                        }}
                            onClick={async () => {
                                try {
                                    await updateNotyApi({ id: n.id })
                                } catch (err) {
                                    openErrorToast(err)
                                }
                            }}
                        >
                            <Grid xs={0.5}>
                                <Avatar sx={{ bgcolor: theme => !n.is_read ? theme.palette.info.light : "inheirt" }}>
                                    <Icons.NotificationsActive />
                                </Avatar>
                            </Grid>
                            <Grid xs={11.5}>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <Typography sx={{
                                        fontWeight: 700
                                    }}>{n.title}</Typography>
                                    <Typography sx={{
                                        fontSize: 12,
                                        fontWeight: 700
                                    }}>{new Date(n.createdAt).toLocaleDateString()}</Typography>
                                </Box>
                                <Typography sx={{
                                    fontSize: 12,
                                    textAlign: "left"
                                }}>{n.description}</Typography>
                            </Grid>

                        </Grid>
                    ))}
                </> : <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: "center",
                    justifyContent: 'center',
                    height: 200,
                    gap: 1,
                }}>
                    <Icons.NotificationsActiveOutlined sx={{
                        width: 50,
                        height: 50
                    }} />
                    <Typography>No Notifications Found</Typography>
                </Box>}
            </Grid>
        </Container>
    )
}

export default Notifications