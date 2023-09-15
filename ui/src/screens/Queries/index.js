import React from "react"
import { getQueryApi } from "../../api"
import { Box, Button, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"



const Queries = ({ id }) => {
    const [queries, setQueries] = React.useState([])

    const getQueries = async () => {
        try {
            const { data } = await getQueryApi({ id })
            setQueries(data.query)
        } catch (err) {
            console.log(err)
        }
    }
    React.useEffect(() => {
        console.log({ id })
        if (id) {
            getQueries()
        }
    }, [id])
    return (<>
        <>
            <Grid container>
                <Grid item xs={12} sx={{ mb: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: 700, color: theme => theme.palette.primary.main, fontSize: 24 }}>{queries.length > 0 && queries[0]["student.name"]} <span style={{ fontSize: 14, fontWeight: "normal" }}>Query Report</span></Typography>
                    <Button sx={{ textTransform: "inherit" }} size="small" variant="contained" disabled={queries.filter(q => q.ended === 1).length > 0}>Add Comment</Button>
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
                                        <TableCell sx={{ fontWeight: 700 }}>{query["tutor.name"]}</TableCell>
                                    </TableRow>
                                ))
                                : ""}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </>
    </>)
}

export default Queries