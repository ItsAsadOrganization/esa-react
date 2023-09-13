import { Avatar, Box, Button, Grid, Toolbar, Typography } from "@mui/material"
import Icons from "../../common/icons"
import { blue } from "@mui/material/colors"
import { useSelector } from "react-redux"
import { getQueriesList, getQueryDetails, getStudentId } from "./querySlice"
import React, { useState } from "react"


const ProfileFragment = () => {
    const queriesList = useSelector(getQueriesList)
    const studentId = useSelector(getStudentId)
    const queryDetails = useSelector(getQueryDetails)

    const [profile, setProfile] = useState(null)

    React.useEffect(() => {
        if (studentId) {
            setProfile(queriesList?.find(q => q.id === studentId))
        }
    }, [studentId])

    return (
        <Grid item xs={!2} md={2} sx={{
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
            {studentId === null ? "Nothing Found" : <Box sx={{
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
                    <Button variant="contained" size="small" fullWidth>
                        Close Query
                    </Button>
                }
            </Box>}
        </Grid>
    )
}
export default ProfileFragment