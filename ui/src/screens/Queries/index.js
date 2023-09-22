import React from "react"
import { getQueryApi, postQueryApi } from "../../api"
import { Box, Button, Grid, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import Dialog from "../../components/Dialog"
import { useDispatch, useSelector } from 'react-redux'
import { getUserId } from "../Login/loginSlice"
import { openErrorToast } from "../../common/toast"
import { handleAddLoading, handleRemoveLoading } from "../../common/commonSlice"



const Queries = ({ id }) => {
    const myid = useSelector(getUserId)
    const dispatch = useDispatch()
    const [queries, setQueries] = React.useState([])
    const [comment, setComment] = React.useState({
        open: false,
        studentId: id,
        userId: myid,
        contact_medium: "",
        follow_up: null,
        comment: ""
    })

    const getQueries = async () => {
        try {
            const { data } = await getQueryApi({ id })
            setQueries(data.query)
        } catch (err) {
            console.log(err)
        }
    }
    React.useEffect(() => {
        if (id) {
            getQueries()
        }
    }, [id])
    return (<>
        <>
            <Grid container>
                <Grid item xs={12} sx={{ mb: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: 700, color: theme => theme.palette.primary.main, fontSize: 24 }}>{queries.length > 0 && queries[0]["student.name"]} <span style={{ fontSize: 14, fontWeight: "normal" }}>Query Report</span></Typography>
                    <Button onClick={() => {
                        setComment({ ...comment, open: true })
                    }} sx={{ textTransform: "inherit" }} size="small" variant="contained" disabled={queries.filter(q => q.ended === 1).length > 0}>Add Comment</Button>
                </Grid>
                <Grid item xs={12}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: "10%", fontWeight: 700 }}>Date</TableCell>
                                <TableCell sx={{ width: "50%", fontWeight: 700 }}>Comment</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Contact Medium</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Next Follow-up</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Coordinated By</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {queries.length > 0 ?
                                queries.map(query => (
                                    <TableRow>
                                        <TableCell>{new Date(query.createdAt).getDate() + "-" + (parseInt(new Date(query.createdAt).getMonth()) + 1) + "-" + new Date(query.createdAt).getFullYear()}</TableCell>
                                        <TableCell>{query.comment}</TableCell>
                                        <TableCell>{query.contact_medium === "wc" ? "WhatsApp Call" :
                                            query.contact_medium === "wvn" ? "WhatsApp Voice Note" :
                                                query.contact_medium === "im" ? "Instant Message" :
                                                    query.contact_medium === "pc" ? "Phone Call" : "WhatsApp Message"
                                        }</TableCell>
                                        <TableCell > {query.follow_up ? <p style={{ fontWeight: 700, margin: "0" }}>{query.follow_up}</p> : "No Follow Up"}</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>{query["user.name"]}</TableCell>
                                    </TableRow>
                                ))
                                : ""}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </>

        <Dialog size={"sm"} dailogOpen={comment.open} title="Add Comment" clickAwayListener={false}
            actionsButtonArray={[
                {
                    label: "Cancel",
                    variant: "outlined",
                    color: "error",
                    size: "small",
                    action: () => {
                        try {
                            setComment({
                                open: false,
                                studentId: id,
                                userId: myid,
                                contact_medium: "",
                                follow_up: null,
                                comment: ""
                            })
                        } catch (err) {
                            openErrorToast(err.message ? err.message : err)
                        }
                    }
                },
                {
                    label: "Save",
                    variant: "contained",
                    size: "small",
                    action: async () => {
                        try {
                            dispatch(handleAddLoading())
                            await postQueryApi({
                                contact_medium: comment.contact_medium,
                                comment: comment.comment,
                                studentId: comment.studentId,
                                userId: comment.userId,
                                follow_up: comment.follow_up
                            })
                            getQueries()
                            setComment({
                                open: false,
                                studentId: id,
                                userId: myid,
                                contact_medium: "",
                                follow_up: null,
                                comment: ""
                            })
                            dispatch(handleRemoveLoading())
                        } catch (err) {
                            dispatch(handleRemoveLoading())
                            openErrorToast(err.message ? err.message : err)
                        }
                    }
                }
            ]}
        >
            <Grid container>
                <Grid item xs={12} sx={{ mb: 1 }}>
                    <TextField label={"Contact Medium"} fullWidth size="small" select value={comment.contact_medium} onChange={(e) => {
                        setComment({ ...comment, contact_medium: e.target.value })
                    }} >
                        <MenuItem value="wc">WhatsApp Call</MenuItem>
                        <MenuItem value="wm">WhatsApp Message</MenuItem>
                        <MenuItem value="wvn">WhatsApp Voice Note</MenuItem>
                        <MenuItem value="pc">Phone Calls</MenuItem>
                        <MenuItem value="im">Instant Message</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} sx={{ mb: 1 }}>
                    <TextField label={"Follow Up"} type="date" fullWidth size="small" value={comment.follow_up} onChange={(e) => {
                        setComment({ ...comment, follow_up: e.target.value })
                    }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label={"Comment"} fullWidth size="small"
                        multiline
                        rows={4}
                        value={comment.comment} onChange={(e) => {
                            setComment({ ...comment, comment: e.target.value })
                        }}
                    />
                </Grid>
            </Grid>
        </Dialog>
    </>)
}

export default Queries