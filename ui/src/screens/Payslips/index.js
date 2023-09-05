import { Container, Grid, IconButton, TextField } from "@mui/material"
import AppBreadCrumbs from "../../components/BreadCrumbs"
import { BREADCRUMBS } from "./constants"
import React from "react"
import { openErrorToast, openSuccessToast } from "../../common/toast"
import { useDispatch, useSelector } from 'react-redux'
import { handleAddLoading, handleRemoveLoading } from "../../common/commonSlice"
import { getPaySlipConfig, getPaySlipId, getPaySlipModelOpen, getPaySlipsList, handleChangePaySlipConfig, handleChangePaySlipId, handleChangePaySlipModalOpen, handleUpdatePaySlipConfig, handleUpdatePaySlipConfigDeductions, handleUpdatePaySlipConfigPayments, payslipsRequested } from "./payslipSlice"
import ExplicitTable, { StyledTableCell, StyledTableRow } from "../../components/ExplicitTable"
import Icons from "../../common/icons"
import Dialog from "../../components/Dialog"
import { updatePaySlipApi } from "../../api"

const Payslips = () => {
    const dispatch = useDispatch()

    const paySlips = useSelector(getPaySlipsList)
    const psModelOpen = useSelector(getPaySlipModelOpen)
    const psConfig = useSelector(getPaySlipConfig)
    const psId = useSelector(getPaySlipId)

    const loadPaySlips = async () => {
        try {
            dispatch(handleAddLoading())
            await dispatch(payslipsRequested()).unwrap()
            dispatch(handleRemoveLoading())
        } catch (err) {
            dispatch(handleRemoveLoading())
            openErrorToast(err.message ? err.message : err)
        }
    }



    const tableActionButtons = [
        // {
        //     label: "Challans",
        //     variant: "contained",
        //     action: (student) => {
        //         console.log("clicked on challan", student.id)
        //     },
        //     icon: Icons.ReceiptLong,
        //     color: "warning"
        // },
        {
            label: "Edit",
            variant: "contained",
            action: (ps) => {
                dispatch(handleChangePaySlipId(ps.id))
                dispatch(handleChangePaySlipConfig(ps.config))
                dispatch(handleChangePaySlipModalOpen(true))
            },
            icon: Icons.BorderColor,
            color: "primary"
        },
        // {
        //     label: "Delete",
        //     variant: "contained",
        //     action: async (student) => {
        //         try {

        //         } catch (err) {
        //             openErrorToast(err.message ? err.message : err)
        //         }
        //     },
        //     icon: Icons.Delete,
        //     color: "error"
        // },
        {
            label: "Configure",
            variant: "contained",
            action: async (student) => {
                try {
                } catch (err) {
                    openErrorToast(err.message ? err.message : err)
                }
            },
            icon: Icons.Settings,
            color: "success"
        }
    ]

    React.useEffect(() => {
        loadPaySlips()
    }, [])
    return (
        <Container maxWidth="xl">
            <AppBreadCrumbs pageTitle={"PaySlips"} paths={BREADCRUMBS} />
            <Grid container maxWidth="xl" >
                <Grid item xs={!2} md={12} sx={{
                    p: 2,
                    boxShadow: theme => theme.shadows[5],
                    background: theme => theme.palette.background.paper,
                    mb: 1
                }}>
                    {paySlips.length > 0 ?
                        <ExplicitTable tableSize="small" columns={[{ name: "Tutor Name" }, { name: "Month" }, { name: "Amount Payable" }, { name: "" }]}>
                            {paySlips.map(ps => (
                                <StyledTableRow id={ps.id}>
                                    <StyledTableCell>{ps.tutor_name}</StyledTableCell>
                                    <StyledTableCell>{ps.month}</StyledTableCell>
                                    <StyledTableCell>{ps.config.net_income}</StyledTableCell>
                                    <StyledTableCell sx={{ textAlign: "right" }}>
                                        {tableActionButtons.map(btn => (
                                            <IconButton color={btn.color} onClick={() => btn.action(ps)}>
                                                <btn.icon />
                                            </IconButton>
                                        ))}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </ExplicitTable>
                        : ""}
                </Grid>
            </Grid>

            <Dialog size={"md"} handleClose={() => {
                dispatch(handleChangePaySlipModalOpen(false))
                dispatch(handleChangePaySlipId(null))
                dispatch(handleChangePaySlipConfig({}))
            }} dailogOpen={psModelOpen} title="Pay Slip Details" hasCloseIcon={true} clickAwayListener={false}

                actionsButtonArray={[
                    {
                        label: "Done",
                        color: "primary",
                        variant: "contained",
                        action: async (data) => {
                            try {

                                dispatch(handleAddLoading())
                                await updatePaySlipApi({ id: psId, config: psConfig })
                                openSuccessToast("Salary Slip Updated")
                                loadPaySlips()
                                dispatch(handleChangePaySlipModalOpen(false))
                                dispatch(handleChangePaySlipId(null))
                                dispatch(handleChangePaySlipConfig({}))
                                dispatch(handleRemoveLoading())
                            } catch (err) {
                                openErrorToast(err.message ? err.message : err)
                                dispatch(handleRemoveLoading())
                            }
                        },
                        size: "small"
                    }
                ]}

            >
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <ExplicitTable tableSize="small">
                            <StyledTableRow>
                                <StyledTableCell colSpan={2} sx={{
                                    background: theme => theme.palette.secondary.light,
                                    color: "#fff",
                                    textAlign: "center"
                                }}>Payments</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>Basic Salary</StyledTableCell>
                                <StyledTableCell sx={{ textAlign: "right", fontWeight: "bold" }}>{psConfig?.payments?.basic_salary}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>Home Allowence</StyledTableCell>
                                <StyledTableCell sx={{ textAlign: "right", fontWeight: "bold" }}>{psConfig?.payments?.home_allowence}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>Utility Allowence</StyledTableCell>
                                <StyledTableCell sx={{ textAlign: "right", fontWeight: "bold" }}>
                                    <TextField
                                        type="number"
                                        fullWidth
                                        size="small"
                                        value={psConfig?.payments?.utility_allowence}
                                        onChange={e => {
                                            dispatch(handleUpdatePaySlipConfigPayments({
                                                key: "utility_allowence",
                                                value: e.target.value
                                            }))
                                        }}
                                    /></StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>Bonus</StyledTableCell>
                                <StyledTableCell sx={{ textAlign: "right", fontWeight: "bold" }}>
                                    <TextField
                                        type="number"
                                        fullWidth
                                        size="small"
                                        value={psConfig?.payments?.bonus}
                                        onChange={e => {
                                            dispatch(handleUpdatePaySlipConfigPayments({
                                                key: "bonus",
                                                value: e.target.value
                                            }))
                                        }}
                                    />
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>Encashment</StyledTableCell>
                                <StyledTableCell sx={{ textAlign: "right", fontWeight: "bold" }}>
                                    <TextField
                                        type="number"
                                        fullWidth
                                        size="small"
                                        value={psConfig?.payments?.encashment}
                                        onChange={e => {
                                            dispatch(handleUpdatePaySlipConfigPayments({
                                                key: "encashment",
                                                value: e.target.value
                                            }))
                                        }}
                                    />
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell sx={{ textAlign: "right", fontWeight: "bold" }}>Gross Salary</StyledTableCell>
                                <StyledTableCell sx={{ textAlign: "right", fontWeight: "bold" }}>{psConfig?.total_payment}</StyledTableCell>
                            </StyledTableRow>
                        </ExplicitTable>
                    </Grid>
                    <Grid item xs={6}>
                        <ExplicitTable tableSize="small">
                            <StyledTableRow>
                                <StyledTableCell colSpan={2} sx={{
                                    background: theme => theme.palette.error.light,
                                    color: "#fff",
                                    textAlign: "center"
                                }}>Deductions</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>Income Tax (FBR)</StyledTableCell>
                                <StyledTableCell sx={{ textAlign: "right", fontWeight: "bold" }}>{psConfig?.deductions?.icome_tax}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1
                                }}>Late Arrivals  <TextField sx={{
                                    maxWidth: 100
                                }}
                                    type="number"
                                    defaultValue={0}
                                    size="small"
                                    value={psConfig?.deductions?.late_arrivals?.days}
                                    onChange={e => {
                                        dispatch(handleUpdatePaySlipConfigDeductions({
                                            key1: "late_arrivals",
                                            key2: "days",
                                            value: e.target.value
                                        }))
                                    }}
                                    /></StyledTableCell>
                                <StyledTableCell sx={{ textAlign: "right", fontWeight: "bold" }}>
                                    {psConfig?.deductions?.late_arrivals?.amount}
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1
                                }}>Unpaid Leaves <TextField
                                        sx={{
                                            maxWidth: 100
                                        }}
                                        size="small"
                                        value={psConfig?.deductions?.unpaid_leaves?.days}
                                        onChange={e => {
                                            dispatch(handleUpdatePaySlipConfigDeductions({
                                                key1: "unpaid_leaves",
                                                key2: "days",
                                                value: e.target.value
                                            }))
                                        }}
                                    /> Days</StyledTableCell>
                                <StyledTableCell sx={{ textAlign: "right", fontWeight: "bold" }}>
                                    {psConfig?.deductions?.unpaid_leaves?.amount}
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell sx={{ textAlign: "right", fontWeight: "bold" }}>Gross Deductions</StyledTableCell>
                                <StyledTableCell sx={{ textAlign: "right", fontWeight: "bold" }}>{psConfig?.total_deductions}</StyledTableCell>
                            </StyledTableRow>
                        </ExplicitTable>
                    </Grid>
                    <Grid item xs={12}>
                        <ExplicitTable tableSize="small">
                            <StyledTableRow sx={{

                            }}>
                                <StyledTableCell sx={{ fontWeight: "bold", border: "1px solid #000 !important" }}>Net Icome</StyledTableCell>
                                <StyledTableCell sx={{ textAlign: "right", border: "1px solid #000 !important", fontWeight: "bold" }}>{psConfig.net_income}</StyledTableCell>
                            </StyledTableRow>
                        </ExplicitTable>
                    </Grid>
                </Grid>
            </Dialog>
        </Container>
    )
}

export default Payslips