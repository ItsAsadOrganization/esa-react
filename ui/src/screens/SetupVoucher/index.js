import { Button, Container, Fab, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Tooltip } from "@mui/material"
import AppBreadCrumbs from "../../components/BreadCrumbs"
import { BREADCRUMBS, TABLE_HEADS } from "./constants"
import Icons from "../../common/icons"
import React from "react"
import { getAllClasses, postVoucherApi } from "../../api"
import { openErrorToast, openSuccessToast } from "../../common/toast"
import { classesRequested, getClassList, getStudentsList, getVoucher, handleChangeClassId, handleChangeConfig, handleChangeConfigFeeDetails, handleChangeConfigFeeDetailsDiscount, handleChangeConfigTrackingId, handleChangeDateExpiry, handleChangeDateIssued, handleChangeIsPaid, handleChangePaymentMode, handleChangeStudentId, handleResetSlice, studentByClassesRequested } from "./setupVoucherSlice"
import { useDispatch, useSelector } from 'react-redux'
import ExplicitTable, { StyledTableCell, StyledTableRow } from "../../components/ExplicitTable"
import { useNavigate } from "react-router"
import { ROUTES } from "../../Layout/Navigation/constants"

const SetupVoucher = () => {
    const dispatch = useDispatch()

    const [fee, setFee] = React.useState({
        fee_type: "",
        fee_amount: "",
        fee_description: "",
    })

    const classesList = useSelector(getClassList)
    const studnetsList = useSelector(getStudentsList)
    const voucher = useSelector(getVoucher)
    const navigate = useNavigate()

    React.useEffect(() => {
        dispatch(classesRequested()).unwrap()
    }, [])

    React.useEffect(() => {
        if (voucher.classId) {
            dispatch(studentByClassesRequested({ class_id: voucher.classId })).unwrap()
        }
    }, [voucher.classId])
    return (
        <Container maxWidth="xl">
            <AppBreadCrumbs pageTitle={"Setup Voucher"} paths={BREADCRUMBS} />
            <Grid container maxWidth="xl" sx={{
                p: 2,
                boxShadow: theme => theme.shadows[5],
            }} >
                <Grid item xs={!2} md={12} sx={{ mb: 2 }} >
                    <FormControl fullWidth size="small">
                        {console.log({ classesList })}
                        <InputLabel>Class</InputLabel>
                        <Select
                            label="Class"
                            value={voucher.classId}
                            onChange={e => {
                                dispatch(handleChangeClassId(e.target.value))
                            }}>
                            <MenuItem value={""}>{"Please select"}</MenuItem>
                            {classesList && classesList.length > 0 ?
                                classesList.map(c => (
                                    <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                                ))
                                : ""}

                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={!2} md={12} sx={{ mb: 2 }} >
                    <FormControl fullWidth size="small">
                        {console.log({ classesList })}
                        <InputLabel>Student</InputLabel>
                        <Select
                            label="Student"
                            value={voucher.studentId}
                            onChange={e => {
                                dispatch(handleChangeStudentId(e.target.value))
                            }}>
                            <MenuItem value={""}>{"Please select"}</MenuItem>
                            {studnetsList && studnetsList.length > 0 ?
                                studnetsList.map(c => (
                                    <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                                ))
                                : ""}

                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={!2} md={6} sx={{ mb: 2 }} >
                    <TextField size="small" label="Issue Date" value={voucher.date_issued} onChange={e => dispatch(handleChangeDateIssued(e.target.value))} fullWidth type="date" />
                </Grid>

                <Grid item xs={!2} md={6} sx={{ mb: 2 }} >
                    <TextField size="small" label="Due Date" value={voucher.date_expiry} onChange={e => dispatch(handleChangeDateExpiry(e.target.value))} fullWidth type="date" />
                </Grid>

                <Grid item xs={!2} md={12} sx={{ mb: 2 }}>
                    <ExplicitTable tableSize="small" columns={[{ name: "Fee Type" }, { name: "Fee Amount" }, { name: "Fee Description" }, { name: "" }]}>
                        <StyledTableRow>
                            <StyledTableCell>
                                <TextField size="small" fullWidth value={fee.fee_type} onChange={e => setFee({ ...fee, fee_type: e.target.value })} />
                            </StyledTableCell>
                            <StyledTableCell>
                                <TextField size="small" fullWidth value={fee.fee_amount} onChange={e => setFee({ ...fee, fee_amount: e.target.value })} />
                            </StyledTableCell>
                            <StyledTableCell>
                                <TextField size="small" fullWidth value={fee.fee_description} onChange={e => setFee({ ...fee, fee_description: e.target.value })} />
                            </StyledTableCell>
                            <StyledTableCell>
                                <Button variant="contained" size="small" onClick={e => {
                                    dispatch(handleChangeConfigFeeDetails({
                                        operation: "add",
                                        fee_details: fee
                                    }))
                                    setFee({
                                        fee_type: "",
                                        fee_amount: "",
                                        fee_description: "",
                                    })
                                }}>
                                    <Icons.Add />
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                        {voucher.config.fee_details.length > 0 ?
                            voucher.config.fee_details.map((f, i) => (
                                <StyledTableRow key={f.fee_type}>
                                    <StyledTableCell>{f.fee_type}</StyledTableCell>
                                    <StyledTableCell>{f.fee_amount}</StyledTableCell>
                                    <StyledTableCell>{f.fee_description}</StyledTableCell>
                                    <StyledTableCell>
                                        <Button variant="contained" color="error" size="small" onClick={e =>
                                            dispatch(handleChangeConfigFeeDetails({
                                                operation: "delete",
                                                index: i
                                            }))}> <Icons.Delete /></Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                            : ""}
                    </ExplicitTable>
                </Grid>

                <Grid item xs={!2} md={7} sx={{ mb: 2 }}></Grid>
                <Grid item xs={!2} md={5} sx={{ mb: 2 }}>
                    <ExplicitTable tableSize="small">
                        <StyledTableRow>
                            <StyledTableCell sx={{ borderBottom: "none !important" }}>Total Amount</StyledTableCell>
                            <StyledTableCell sx={{ textAlign: "right", borderBottom: "none !important" }}><b>{voucher.config.total_amount}</b></StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell>Discount</StyledTableCell>
                            <StyledTableCell sx={{ textAlign: "right" }}> <TextField
                                id="outlined-start-adornment"
                                size="small"
                                value={voucher.config.discount}
                                onChange={e => dispatch(handleChangeConfigFeeDetailsDiscount(e.target.value))}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                }}
                            /></StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell>Subtotal</StyledTableCell>
                            <StyledTableCell sx={{ textAlign: "right" }}><b>{voucher.config.sub_total}</b></StyledTableCell>
                        </StyledTableRow>
                    </ExplicitTable>
                </Grid>


                <Grid item xs={!2} md={12} sx={{ mb: 2 }}>
                    <Button variant="contained" size="small" onClick={async e => {
                        try {
                            const response = await postVoucherApi({...voucher})
                            openSuccessToast("Voucher Added")
                            dispatch(handleResetSlice())
                            navigate(`/${ROUTES.vouchers}`)

                        } catch (err) {
                            openErrorToast(err)
                        }
                    }}>
                        Save
                    </Button>
                </Grid>

            </Grid>


        </Container>
    )
}

export default SetupVoucher