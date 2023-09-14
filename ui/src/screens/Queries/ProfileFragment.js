import { Avatar, Box, Button, Fab, Grid, Toolbar, Tooltip, Typography } from "@mui/material"
import Icons from "../../common/icons"
import { blue } from "@mui/material/colors"
import { useDispatch, useSelector } from "react-redux"
import { getQueriesList, getQueryDetails, getStudentId, getStudentsList, studentQueriesRequested } from "./querySlice"
import React, { useState } from "react"
import { openErrorToast } from "../../common/toast"
import { endQueryApi } from "../../api"
import { getUserName } from "../Login/loginSlice"
import { socket } from "../.."


const ProfileFragment = () => {
    const studentsList = useSelector(getStudentsList)
    const studentId = useSelector(getStudentId)
    const queryDetails = useSelector(getQueryDetails)
    const username = useSelector(getUserName)

    const dispatch = useDispatch()

    const [profile, setProfile] = useState(null)

    const loadQueryDetails = async () => {
        try {
            await dispatch(studentQueriesRequested({ studentId })).unwrap()
        } catch (err) {
            openErrorToast(err.message ? err.message : err)
        }
    }

    React.useEffect(() => {
        if (studentId) {
            setProfile(studentsList?.find(q => q.id === studentId))
        }
    }, [studentId])

    return (
        <Grid item xs={!2} md={3} lg={2} sm={8} sx={{
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
                }}>Profile</Typography>
            </Toolbar>
            {studentId === null ? <Box sx={{
                margin: "auto",
                marginTop: "80%",
                maxWidth: "fit-content",
                textAlign: "center"
            }}>
                <Icons.AccountCircleOutlined sx={{
                    color: theme => theme.palette.customFontColor.light,
                    fontSize: "3.5em"
                }} />
                <Typography sx={{
                    fontWeight: 700,
                    color: theme => theme.palette.customFontColor.light
                }}>Nothing to show</Typography>
            </Box> : <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
            }}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: 200,
                }}>
                    <Avatar sx={{ bgcolor: blue[500], width: 150, height: 150, fontSize: 85, fontWeight: 700 }} aria-label="recipe">
                        {profile?.name?.slice(0, 1)}
                    </Avatar>
                </Box>
                <Typography sx={{
                    fontSize: 20,
                    fontWeight: 600
                }}>{profile?.name}</Typography>
                <Typography sx={{
                    fontSize: 14,
                    fontWeight: 400,
                    mb: 2
                }}>Query Client</Typography>


                <Box sx={{ width: "100%", mb: 1 }}>
                    <Typography sx={{ fontSize: 14, color: "#777" }}>Email Address</Typography>
                    <Typography>{profile?.email_address}</Typography>
                </Box>
                <Box sx={{ width: "100%", mb: 5 }}>
                    <Typography sx={{ fontSize: 14, color: "#777" }}>Contact Number</Typography>
                    <Typography>{profile?.phone_1}</Typography>
                </Box>

                {queryDetails.filter(q => q.ended).length === 0 &&
                    <Button onClick={async () => {
                        try {
                            socket.emit('chat-ended-opened', await endQueryApi({ id: studentId, name: username }))
                            loadQueryDetails()
                        } catch (err) {
                            openErrorToast(err.message ? err.message : err)
                        }
                    }} variant="contained" size="small" fullWidth>
                        Close Query
                    </Button>
                }
            </Box>}


        </Grid>
    )
}
export default ProfileFragment