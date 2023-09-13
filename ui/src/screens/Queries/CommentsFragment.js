import { Box, Grid, Toolbar, Typography, TextField, IconButton, MenuItem } from "@mui/material"
import Icons from "../../common/icons"
import { useDispatch, useSelector } from "react-redux"
import { getComment, getContactMedium, getFollowUp, getQueryDetails, getStudentId, getTutorsList, handleChangeComment, handleChangeContactMedium, handleChangeFollowUp, handleResetForm, studentQueriesRequested } from "./querySlice"
import React from "react"
import { openErrorToast } from "../../common/toast"
import { handleAddLoading, handleRemoveLoading } from "../../common/commonSlice"
import bg from './bg.png'
import { getUserEmail, getUserId, getUserName, getUserRole } from "../Login/loginSlice"
import { postQueryApi } from "../../api"


const Comment = ({ details, tutorsList }) => {
    const myEmail = useSelector(getUserEmail)
    const myId = useSelector(getUserId)

    return (
        <Box sx={{
            background: theme => tutorsList.find(t => t.email === myEmail).id === details.tutorId ? theme.palette.info.light : theme.palette.background.paper,
            maxWidth: '75%',
            minWidth: '50%',
            p: 1,
            mb: 1,
            float: tutorsList.find(t => t.email === myEmail).id === details.tutorId ? "right" : "left"
        }}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Typography sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: theme => theme.palette.primary.main
                }}>{tutorsList.find(t => t.id === details.tutorId).name}</Typography>
                <Typography sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: theme => tutorsList.filter(t => t.email === myEmail).length > 0 ? "#000" : theme.palette.customFontColor.light
                }}>{details.createdAt}</Typography>
            </Box>
            <Box>
                <Typography sx={{
                    fontSize: 15,
                    py: 0.5
                }}>{details.comment}</Typography>
            </Box>


            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                {details.contact_medium &&
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}>
                        <Typography sx={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: theme => theme.palette.primary.main
                        }}>Contact Medium</Typography>
                        <Typography sx={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: theme => tutorsList.filter(t => t.email === myEmail).length > 0 ? "#000" : theme.palette.customFontColor.light
                        }}>{details.contact_medium === "pc" ? "Phone Call" :
                            details.contact_medium === "im" ? "Instant Messaging" :
                                details.contact_medium === "wc" ? "WhatsApp Call" :
                                    details.contact_medium === "wm" ? "WhatsApp Message" :
                                        details.contact_medium === "wvn" ? "WhatsApp Voice Note" : ""
                            }</Typography>
                    </Box>
                }
                {details.follow_up &&
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}>
                        <Typography sx={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: theme => theme.palette.primary.main
                        }}>Next Follow Up</Typography>
                        <Typography sx={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: theme => theme.palette.customFontColor.light
                        }}>{details.follow_up}</Typography>
                    </Box>
                }


            </Box>
        </Box>
    )
}

const CommentsFragment = () => {
    const studentId = useSelector(getStudentId)
    const queryDetails = useSelector(getQueryDetails)
    const tutorsList = useSelector(getTutorsList)
    const useremail = useSelector(getUserEmail)
    const myId = useSelector(getUserId)

    const comment = useSelector(getComment)
    const followUp = useSelector(getFollowUp)
    const contact_medium = useSelector(getContactMedium)

    const dispatch = useDispatch()

    const loadQueryDetails = async () => {
        try {
            dispatch(handleAddLoading())
            await dispatch(studentQueriesRequested({ studentId })).unwrap()
            dispatch(handleRemoveLoading())
        } catch (err) {
            dispatch(handleRemoveLoading())
            openErrorToast(err.message ? err.message : err)
        }
    }
    React.useEffect(() => {
        if (studentId) {
            loadQueryDetails()
        }
    }, [studentId])
    return (
        <Grid item xs={!2} md={7} sx={{
            boxShadow: theme => theme.shadows[5],
            background: theme => theme.palette.background.paper
        }}>
            <Toolbar sx={{
                px: "10px !important",
                boxShadow: theme => theme.shadows[5],
            }}>
                {/* <Icons.Close /> */}
                <Typography sx={{
                    fontWeight: 700,
                    ml: 1
                }}>Queries & Feedbacks</Typography>
            </Toolbar>
            <Box sx={{
                p: 2,
                background: `url(${bg})`,
                backgroundRepeat: "repeat",
                minHeight: theme => `calc(100vh - ${theme.mixins.toolbar.minHeight * 3}px - ${theme.mixins.toolbar.minHeight}px - 75px)`,
                maxHeight: theme => `calc(100vh - ${theme.mixins.toolbar.minHeight * 3}px - ${theme.mixins.toolbar.minHeight}px - 75px)`,
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
                {queryDetails.length > 0 ?
                    queryDetails.map(qd => (
                        <Comment details={qd} key={qd.id} tutorsList={tutorsList} />
                    ))
                    : ""}
            </Box>

            {queryDetails.filter(q => q.ended).length === 0 ? <Toolbar sx={{
                px: "10px !important",
                borderTop: '1px solid #777',
                p: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1.5
            }}>
                <TextField fullWidth size="small" placeholder="Comments" value={comment} onChange={e => dispatch(handleChangeComment(e.target.value))} />
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    gap: 1.5
                }}>
                    <TextField fullWidth size="small" label="Next Follow Up" type="date" value={followUp} onChange={e => dispatch(handleChangeFollowUp(e.target.value))} />
                    <TextField fullWidth size="small" label="Contact Medium" select value={contact_medium} onChange={e => dispatch(handleChangeContactMedium(e.target.value))}>
                        <MenuItem value="pc">Phone Call</MenuItem>
                        <MenuItem value="im">Instant Message</MenuItem>
                        <MenuItem value="wc">WhatsApp Call</MenuItem>
                        <MenuItem value="wm">WhatsApp Message</MenuItem>
                        <MenuItem value="wvn">WhatsApp Voice Note</MenuItem>
                    </TextField>
                    <IconButton onClick={async (e) => {
                        try {
                            let tutorId = ""
                            const tutor = tutorsList.filter(t => t.email === useremail)
                            if (tutor.length > 0) {
                                tutorId = tutor[0].id
                            } else {
                                tutorId = myId
                            }
                            await postQueryApi({ tutorId, studentId, follow_up: followUp, contact_medium, comment })
                            dispatch(handleResetForm())
                            loadQueryDetails()
                        } catch (err) {
                            openErrorToast(err)
                        }
                    }}>
                        <Icons.Save />
                    </IconButton>
                </Box>
            </Toolbar> : <Toolbar sx={{
                px: "10px !important",
                borderTop: '1px solid #777',
                p: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1.5
            }}>
                <Typography>The Query has been Closed</Typography>
            </Toolbar>}
        </Grid>
    )
}
export default CommentsFragment