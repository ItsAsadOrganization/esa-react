import { Container, Divider, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import ExplicitTable, { StyledTableCell, StyledTableRow } from "../../components/ExplicitTable"


const PreviewVoucher = ({ drawerUser, studentsList, classList }) => {
    return (
        <Container maxWidth="xl">
            <Grid container>
                <Grid item xs={12} sx={{ mb: 2 }}>
                    <Typography sx={{
                        textAlign: "center",
                        background: "#000",
                        color: "#fff",
                        px: 2,
                        py: 0.75,
                        maxWidth: "fit-content",
                        margin: "auto"
                    }}>Fee Slip</Typography>
                </Grid>

                <Grid item xs={12} sx={{ mb: 2 }}>
                    <Typography sx={{
                        maxWidth: "fit-content",
                        margin: "auto",
                        fontWeight: 700,
                        textTransform: "uppercase"
                    }}>
                        Encore Group Of Colleges
                    </Typography>
                </Grid>


                <Grid item xs={3} sx={{ mb: 1 }}>
                    <Typography sx={{
                        fontSize: 14
                    }}>
                        Account Number
                    </Typography>
                </Grid>
                <Grid item xs={9} sx={{ mb: 1 }}>
                    <Typography sx={{
                        fontSize: 14,
                        fontWeight: "bold"
                    }}>
                        PK ASCM 0007 05** **** ****
                    </Typography>
                </Grid>


                <Grid item xs={3} sx={{ mb: 1 }}>
                    <Typography sx={{
                        fontSize: 14
                    }}>
                        Account Title
                    </Typography>
                </Grid>
                <Grid item xs={9} sx={{ mb: 1 }}>
                    <Typography sx={{
                        fontSize: 14,
                        fontWeight: "bold"
                    }}>
                        Encore Group Of Colleges
                    </Typography>
                </Grid>

                <Grid item xs={3} sx={{ mb: 1 }}>
                    <Typography sx={{
                        fontSize: 14
                    }}>
                        Bank Name
                    </Typography>
                </Grid>
                <Grid item xs={9} sx={{ mb: 1 }}>
                    <Typography sx={{
                        fontSize: 14,
                        fontWeight: "bold"
                    }}>
                        Habib Bank Limited
                    </Typography>
                </Grid>


                <Grid item xs={3} sx={{ mb: 1 }}>
                    <Typography sx={{
                        fontSize: 14
                    }}>
                        Student Name
                    </Typography>
                </Grid>
                <Grid item xs={9} sx={{ mb: 1 }}>
                    <Typography sx={{
                        fontSize: 14,
                        fontWeight: "bold"
                    }}>
                        {studentsList.find(student => student.id === drawerUser.studentId).name}
                    </Typography>
                </Grid>


                <Grid item xs={3} sx={{ mb: 1 }}>
                    <Typography sx={{
                        fontSize: 14
                    }}>Class
                    </Typography>
                </Grid>
                <Grid item xs={9} sx={{ mb: 1 }}>
                    <Typography sx={{
                        fontSize: 14,
                        fontWeight: "bold"
                    }}>
                        {classList.find(cl => cl.id === drawerUser.classId).name}
                    </Typography>
                </Grid>

                <Grid item xs={3} sx={{ mb: 1 }}>
                    <Typography sx={{
                        fontSize: 14
                    }}>Roll Number
                    </Typography>
                </Grid>
                <Grid item xs={9} sx={{ mb: 1 }}>
                    <Typography sx={{
                        fontSize: 14,
                        fontWeight: "bold"
                    }}>
                        {drawerUser.studentId}
                    </Typography>
                </Grid>


                <Grid item xs={12} sx={{ mb: 1 }}>
                    <Table size="small">
                        <TableHead >
                            <TableCell sx={{ fontWeight: "bold", fontSize: 13 }}>Fee Type</TableCell>
                            <TableCell sx={{ textAlign: "right", fontSize: 13, fontWeight: "bold" }}>Fee Amount</TableCell>
                        </TableHead>
                        <TableBody>
                            {drawerUser.config.fee_details.map(fee => (
                                <TableRow key={fee.fee_type}>
                                    <TableCell sx={{ fontSize: 12 }} >{fee.fee_type}</TableCell>
                                    <TableCell sx={{ textAlign: "right", fontSize: 12 }} ><b>PKR {fee.fee_amount} /-</b></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>

                <Grid item xs={6} sx={{ mb: 1 }}></Grid>
                <Grid item xs={6} sx={{ mb: 1 }}>
                    <Table size="small">
                        <TableBody>
                            <TableRow >
                                <TableCell sx={{ fontSize: 12 }} >Total Amount</TableCell>
                                <TableCell sx={{ textAlign: "right", fontSize: 12 }} ><b>PKR {drawerUser.config.total_amount} /-</b></TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell sx={{ fontSize: 12 }} >Discount</TableCell>
                                <TableCell sx={{ textAlign: "right", fontSize: 12 }} ><b>{drawerUser.config.discount}%</b></TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell sx={{ fontSize: 12 }} >Sub Total</TableCell>
                                <TableCell sx={{ textAlign: "right", fontSize: 12 }} ><b>PKR {drawerUser.config.sub_total} /-</b></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>

                <Grid item xs={12}>
                    <Typography>Important Notice</Typography>
                </Grid>
                <Grid item xs={12} sx={{ mb: 4 }}>
                    <Table>
                        <TableBody>
                            <TableRow sx={{ verticalAlign: "top" }}>
                                <TableCell sx={{ padding: 0, fontSize: 12 }}>1</TableCell>
                                <TableCell sx={{ padding: 0, fontSize: 12 }} width={"95%"} >Tuition Fee is payable in advance and once paid is<b> Non-Refundable</b></TableCell>
                            </TableRow>
                            <TableRow sx={{ verticalAlign: "top" }}>
                                <TableCell sx={{ padding: 0, fontSize: 12 }}>2</TableCell>
                                <TableCell sx={{ padding: 0, fontSize: 12, textDecoration: "underline" }} width={"95%"} >Tuition Fee must be paid before the last date of payment stated on the Fee Bill. A fine of <b>Rs. 100/- per day</b> will be charged after lapse of last date of payment.</TableCell>
                            </TableRow>
                            <TableRow sx={{ verticalAlign: "top" }}>
                                <TableCell sx={{ padding: 0, fontSize: 12 }}>3</TableCell>
                                <TableCell sx={{ padding: 0, fontSize: 12, }} width={"95%"} >If a student fails to pay tuition fee within 5 days after the last date of payment. He/She will not be permitted to sit in the class.</TableCell>
                            </TableRow>
                            <TableRow sx={{ verticalAlign: "top" }}>
                                <TableCell sx={{ padding: 0, fontSize: 12 }}>4</TableCell>
                                <TableCell sx={{ padding: 0, fontSize: 12, }} width={"95%"} >	Tuition Fee for the month(s) of June - August Quarter must be paid before the begining of <b>Summer Vacation </b></TableCell>
                            </TableRow>
                            <TableRow sx={{ verticalAlign: "top" }}>
                                <TableCell sx={{ padding: 0, fontSize: 12 }}>5</TableCell>
                                <TableCell sx={{ padding: 0, fontSize: 12, }} width={"95%"} > If a student is to be withdrawn, A notice of one month must be given in writing or one month's fee is payment on lieu of the notice </TableCell>
                            </TableRow>
                            <TableRow sx={{ verticalAlign: "top" }}>
                                <TableCell sx={{ padding: 0, fontSize: 12 }}>6</TableCell>
                                <TableCell sx={{ padding: 0, fontSize: 12, }} width={"95%"} > If a student fails to give fee bill to his/her parents. It is the responsibility of the parents to bring it to the notice of the school account officer <b>Rs. 100/-</b> will be charged if a fee bill is reported lost and duplicate copy asked for </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                </Grid>


                <Grid item xs={6} sx={{ mb: 1, display: "flex", gap: 1 }}>
                    <Typography sx={{
                        fontSize: 14
                    }}>
                        Date Issued
                    </Typography>
                    <Typography sx={{
                        fontSize: 14,
                        fontWeight: "bold"
                    }}>
                        {drawerUser.date_issued}
                    </Typography>
                </Grid>

                <Grid item xs={6} sx={{ mb: 1, display: "flex", gap: 1, justifyContent: "end" }}>
                    <Typography sx={{
                        fontSize: 14
                    }}>
                        Due Date
                    </Typography>
                    <Typography sx={{
                        fontSize: 14,
                        fontWeight: "bold"
                    }}>
                        {drawerUser.date_expiry}
                    </Typography>
                </Grid>


                <Grid item xs={6} sx={{ mb: 1, display: "flex", flexDirection: "column", gap: 1, mt: 9 }}>

                    <Typography sx={{
                        fontSize: 14
                    }}>Bank Stamp</Typography>
                </Grid>
                <Grid item xs={6} sx={{ mb: 1, display: "flex", gap: 1, justifyContent: "end", mt: 9 }}>

                    <Typography sx={{
                        fontSize: 14
                    }}>Office Stamp</Typography>
                </Grid>

            </Grid>
        </Container>
    )
}

export default PreviewVoucher