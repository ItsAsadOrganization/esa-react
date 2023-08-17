import { Box, Chip, Container, Fab, Grid, IconButton, MenuItem, SwipeableDrawer, TextField, Tooltip, Typography } from "@mui/material"
import AppBreadCrumbs from "../../components/BreadCrumbs"
import { BREADCRUMBS, TABLE_HEADS } from "./constants"
import ExplicitTable, { StyledTableCell, StyledTableRow } from "../../components/ExplicitTable"
import { useNavigate } from "react-router"
import Icons from "../../common/icons"
import { ROUTES } from "../../Layout/Navigation/constants"
import { useDispatch, useSelector } from "react-redux"
import { classesRequested, getClassesList, getDialogOpen, getDrawerOpen, getDrawerUSer, getStudentsList, getVouchersList, handleChangeDrawerOpen, handleChangeDrawerUser, handleChangeVoucherID, handleChangeVoucherModalOpen, handleChangeVoucherPaid, handleChangeVoucherPaymentMode, studentsRequested, vouchersRequested } from "./voucherSlice"
import React from "react"
import PreviewVoucher from "../PreviewVoucher"
import Dialog from "../../components/Dialog"
import { openErrorToast, openSuccessToast } from "../../common/toast"
import { putVoucherApi } from "../../api"

const Vouchers = () => {
    const navigate = useNavigate()
    const vouchersList = useSelector(getVouchersList)
    const studentsList = useSelector(getStudentsList)
    const classList = useSelector(getClassesList)
    const dispatch = useDispatch()
    const drawerOpen = useSelector(getDrawerOpen)
    const drawerUser = useSelector(getDrawerUSer)
    const dialogOpen = useSelector(getDialogOpen)




    const tableActionButtons = [
        // {
        //     label: "Print",
        //     variant: "contained",
        //     action: (student) => {
        //         console.log("clicked on challan", student.id)
        //     },
        //     icon: Icons.Print,
        //     color: "success"
        // },
        {
            label: "Challans",
            variant: "contained",
            action: (student) => {
                dispatch(handleChangeDrawerOpen(true))
                dispatch(handleChangeDrawerUser(student))
            },
            icon: Icons.ReceiptLong,
            color: "warning"
        },
        {
            label: "Edit",
            variant: "contained",
            action: (student) => {
                dispatch(handleChangeDrawerUser(student))
                dispatch(handleChangeVoucherModalOpen(true))
            },
            icon: Icons.BorderColor,
            color: "primary"
        },
        {
            label: "Delete",
            variant: "contained",
            action: (student) => { },
            icon: Icons.Delete,
            color: "error"
        }
    ]

    React.useEffect(() => {
        dispatch(vouchersRequested()).unwrap()
        dispatch(studentsRequested()).unwrap()
        dispatch(classesRequested()).unwrap()
    }, [])

    return (
        <Container maxWidth="xl">
            <AppBreadCrumbs pageTitle={"Vouchers"} paths={BREADCRUMBS} />
            <Grid container maxWidth="xl" >
                <Grid item xs={!2} md={12} sx={{
                    p: 2,
                    boxShadow: theme => theme.shadows[5],
                    mb: 1
                }}>
                    {console.log({vouchersList})}
                    <ExplicitTable tableSize="small" columns={TABLE_HEADS}>
                        {vouchersList.length > 0 ?
                            vouchersList.map(v => (
                                <StyledTableRow key={v.id}>
                                    <StyledTableCell>{v.voucher_id}</StyledTableCell>
                                    <StyledTableCell>{studentsList.find(std => std.id === v.studentId).name}</StyledTableCell>
                                    <StyledTableCell>{classList.find(c => c.id=== v.classId).name}</StyledTableCell>
                                    <StyledTableCell>{v.date_issued}</StyledTableCell>
                                    <StyledTableCell>{v.date_expiry}</StyledTableCell>
                                    <StyledTableCell>{v.is_paid ? <Chip label="Paid" color="success" size="small" sx={{ px: 2 }} /> : <Chip label="UnPaid" color="error" size="small" sx={{ px: 2 }} />}</StyledTableCell>
                                    <StyledTableCell>{v.payment_mode}</StyledTableCell>
                                    <StyledTableCell>
                                        {tableActionButtons.map(btn => (
                                            <IconButton color={btn.color} onClick={() => btn.action(v)}>
                                                <btn.icon />
                                            </IconButton>
                                        ))}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                            : "Nothing here"}
                    </ExplicitTable>
                </Grid>
            </Grid>



            <Tooltip placement="top" title="Add New Student">
                <Fab color="primary" onClick={() => { navigate(`/${ROUTES.setupVoucher}`) }} sx={{
                    position: "absolute",
                    right: 50,
                    bottom: 50
                }}>
                    <Icons.Add />
                </Fab>
            </Tooltip>


            {drawerUser &&
                <SwipeableDrawer
                    PaperProps={{
                        sx: { maxWidth: 600, px: 2 },
                    }}
                    anchor={"right"}
                    open={drawerOpen}
                    onClose={() => { }}
                    onOpen={() => {
                        dispatch(handleChangeDrawerOpen(true))
                    }}
                >
                    <Box>
                        <IconButton color="error" onClick={() => {
                            dispatch(handleChangeDrawerOpen(false))
                            dispatch(handleChangeDrawerUser(null))
                        }}>
                            <Icons.Close />
                        </IconButton>
                    </Box>
                    <Box sx={{
                        maxWidth: 550,
                        minWidth: 550,
                        border: '1px solid',
                        margin: "auto",
                        boxSizing: "content-box",
                        p: 2,
                        position: "relative"
                    }}>
                        {drawerUser.is_paid ? <Typography sx={{
                            fontSize: 36,
                            fontWeight: 700,
                            border: "3px dashed green",
                            maxWidth: "fit-content",
                            px: 1,
                            py: 0.5,
                            color: "green",
                            position: "absolute",
                            transform: "rotate(45deg)",
                            top: 150,
                            right: 25
                        }}>PAID</Typography> : <Typography sx={{
                            fontSize: 36,
                            fontWeight: 700,
                            border: "3px dashed red",
                            maxWidth: "fit-content",
                            px: 1,
                            py: 0.5,
                            color: "red",
                            position: "absolute",
                            transform: "rotate(45deg)",
                            top: 150,
                            right: 25
                        }}>UNPAID</Typography>}
                        <PreviewVoucher drawerUser={drawerUser} />
                    </Box>
                </SwipeableDrawer>
            }

            <Dialog dailogOpen={dialogOpen} hasCloseIcon={true} clickAwayListener={false} size={"md"} title="Update Voucher Payment"
                actionsButtonArray={[
                    {
                        label: "Done",
                        color: "primary",
                        variant: "contained",
                        action: async () => {
                            try {
                                await putVoucherApi({
                                    id: drawerUser.id,
                                    date_issued: drawerUser.date_issued,
                                    date_expiry: drawerUser.date_expiry,
                                    config: drawerUser.config,
                                    payment_mode: drawerUser.payment_mode,
                                    is_paid: drawerUser.is_paid,
                                    classId: drawerUser.classId, studentId: drawerUser.studentId
                                })
                                dispatch(handleChangeVoucherModalOpen(false))
                                dispatch(vouchersRequested()).unwrap()
                                openSuccessToast("Record Updated")
                            } catch (err) {
                                openErrorToast(err)
                            }
                        },
                        size: "small"
                    }
                ]}
            >
                {drawerUser && <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField label="Payment Status" fullWidth size="small" select value={drawerUser.is_paid} onChange={e => {
                            dispatch(handleChangeVoucherPaid(e.target.value))
                            if (e.target.value === false) {
                                dispatch(handleChangeVoucherPaymentMode(""))
                            }
                        }} >
                            <MenuItem value={false}>UnPaid</MenuItem>
                            <MenuItem value={true}>Paid</MenuItem>
                        </TextField>
                    </Grid>
                    {drawerUser.is_paid && <Grid item xs={12}>
                        <TextField label="Payment Mode" fullWidth size="small" select value={drawerUser.payment_mode} onChange={(e) => dispatch(handleChangeVoucherPaymentMode(e.target.value))} >
                            <MenuItem value={"cash"}>Cash</MenuItem>
                            <MenuItem value={"bank-deposit"}>Bank Deposit</MenuItem>
                            <MenuItem value={"easypaisa"}>Easypaisa</MenuItem>
                            <MenuItem value={"jazzcash"}>JazzCash</MenuItem>
                            <MenuItem value={"bank"}>Bank Transfer</MenuItem>
                        </TextField>
                    </Grid>}

                </Grid>}
            </Dialog>
        </Container>
    )
}

export default Vouchers