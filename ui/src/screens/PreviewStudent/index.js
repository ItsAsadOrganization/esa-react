import { Box, Chip, Collapse, Container, Grid, IconButton, List, ListItem, Tab, Tabs, Typography } from "@mui/material"
import AppBreadCrumbs from "../../components/BreadCrumbs"
import { BREADCRUMBS } from "./constants"
import { useDispatch, useSelector } from "react-redux"
import { getClassesList, getStudentChallans, getStudentDetail, getStudentId, previewStudentClassesRequested, previewStudentRequested, studentVoucherRequested } from "./previewStudentSlice"
import React, { Fragment } from "react"
import { openErrorToast } from "../../common/toast"
import { handleAddLoading, handleRemoveLoading } from "../../common/commonSlice"
import ExplicitTable, { StyledTableCell, StyledTableRow } from "../../components/ExplicitTable"
import Icons from "../../common/icons"

const PreviewStudent = () => {
    const student_id = useSelector(getStudentId)
    const studentDetail = useSelector(getStudentDetail)
    const classesList = useSelector(getClassesList)
    const challans = useSelector(getStudentChallans)
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState({
        expand: false,
        id: null
    })

    const loadStudentDetail = () => {
        try {
            dispatch(handleAddLoading())
            dispatch(previewStudentRequested({ student_id })).unwrap()
            dispatch(studentVoucherRequested({ student_id })).unwrap()
            dispatch(handleRemoveLoading())
        } catch (err) {
            openErrorToast(err.message ? err.message : err)
            dispatch(handleRemoveLoading())
        }
    }
    React.useEffect(() => {
        dispatch(previewStudentClassesRequested()).unwrap()

        loadStudentDetail()
    }, [])
    return (
        <Container maxWidth="xl">
            {console.log({ challans })}
            <AppBreadCrumbs pageTitle={"Student Profile"} paths={BREADCRUMBS} />
            <Grid container>
                <Grid item xs={12} md={4} sx={{
                    p: 1,

                }}>
                    <Box sx={{
                        background: theme => theme.palette.background.paper,
                        px: 1,
                        py: 3
                    }}>
                        <Box sx={{
                            border: theme => `2px solid ${theme.palette.primary.main}`,
                            borderRadius: "50%",
                            width: 150,
                            height: 150,
                            overflow: "hidden",
                            p: 1,
                            boxShadow: theme => theme.shadows[4],
                            margin: "auto",
                            mb: 2
                        }}>
                            <img style={{ width: "100%", borderRadius: "50%", }} src={`${window.location.protocol}//${window.location.hostname}:3502/${studentDetail.avatar}`} />
                        </Box>
                        <Typography sx={{
                            fontWeight: 700,
                            textAlign: "center",
                            fontSize: 28,
                            color: theme => theme.palette.primary.main
                        }}>{studentDetail.name}</Typography>
                        <Typography sx={{
                            textAlign: "center",
                            fontSize: 14,
                            fontStyle: "italic",
                            color: theme => theme.palette.customFontColor.main
                        }}>Roll No: <span style={{
                            fontWeight: 700
                        }}>EGC-{studentDetail.id}</span></Typography>
                        <List>
                            <ListItem sx={{ justifyContent: "space-between" }}>
                                <Typography>Class</Typography>
                                <Typography sx={{ fontSize: 16, fontWeight: 700 }}>{(studentDetail.classId && classesList.length > 0) ? classesList.find(c => c.id === studentDetail.classId).name : ""}</Typography>
                            </ListItem>
                            <ListItem sx={{ justifyContent: "space-between" }}>
                                <Typography>Father Name</Typography>
                                <Typography sx={{ fontSize: 16, fontWeight: 700 }}>{studentDetail.father_name}</Typography>
                            </ListItem>
                            <ListItem sx={{ justifyContent: "space-between" }}>
                                <Typography>Email Address</Typography>
                                <Typography sx={{ fontSize: 16, fontWeight: 700 }}>{studentDetail.email_address}</Typography>
                            </ListItem>
                            <ListItem sx={{ justifyContent: "space-between" }}>
                                <Typography>Father Contact</Typography>
                                <Typography sx={{ fontSize: 16, fontWeight: 700 }}>{studentDetail.phone_1}</Typography>
                            </ListItem>
                            <ListItem sx={{ justifyContent: "space-between" }}>
                                <Typography>Home Contact</Typography>
                                <Typography sx={{ fontSize: 16, fontWeight: 700 }}>{studentDetail.phone_2 ? studentDetail.phone_2 : "Not Provided"}</Typography>
                            </ListItem>
                            <ListItem sx={{ justifyContent: "space-between" }}>
                                <Typography>Emergency Contact</Typography>
                                <Typography sx={{ fontSize: 16, fontWeight: 700 }}>{studentDetail.phone_3 ? studentDetail.phone_3 : "Not Provided"}</Typography>
                            </ListItem>
                            <ListItem sx={{ justifyContent: "space-between" }}>
                                <Typography>Father CNIC</Typography>
                                <Typography sx={{ fontSize: 16, fontWeight: 700 }}>{studentDetail.father_cnic}</Typography>
                            </ListItem>
                            <ListItem sx={{ justifyContent: "space-between" }}>
                                <Typography>CNIC / Form - B</Typography>
                                <Typography sx={{ fontSize: 16, fontWeight: 700 }}>{studentDetail.cnic}</Typography>
                            </ListItem>

                        </List>
                    </Box>

                </Grid>
                <Grid item xs={12} md={8} sx={{
                    p: 1,
                }}>
                    <Box sx={{
                        background: theme => theme.palette.background.paper,
                        p: 2
                    }}>
                        <ExplicitTable tableSize="small" columns={[
                            { name: "" },
                            { name: "Voucher Id" },
                            { name: "Date Issued" },
                            { name: "Due Date" },
                            { name: "Payment Status" },
                        ]} >
                            {challans.length > 0 ?
                                challans.map(challan => (
                                    <Fragment key={challan.id}>
                                        <StyledTableRow>
                                            <StyledTableCell>
                                                <IconButton onClick={() => {
                                                    if (open.expand && open.id === challan.id) {
                                                        setOpen({
                                                            expand: false,
                                                            id: null
                                                        })
                                                    } else {
                                                        setOpen({
                                                            expand: true,
                                                            id: challan.id
                                                        })
                                                    }
                                                }}>
                                                    {!open.expand ? <Icons.ExpandMore /> : <Icons.ExpandLess />}
                                                </IconButton>
                                            </StyledTableCell>
                                            <StyledTableCell> {challan.id} </StyledTableCell>
                                            <StyledTableCell> {challan.date_issued} </StyledTableCell>
                                            <StyledTableCell> {challan.date_expiry} </StyledTableCell>
                                            <StyledTableCell >{challan.is_paid ? <Chip label="Paid" color="success" size="small" sx={{ px: 2 }} /> : <Chip label="UnPaid" color="error" size="small" sx={{ px: 2 }} />}</StyledTableCell>
                                        </StyledTableRow>
                                        <StyledTableRow>
                                            <StyledTableCell colSpan={5} sx={{
                                            }}>
                                                <Collapse in={open.expand && open.id === challan.id} sx={{
                                                    border: theme => `1px solid ${theme.palette.primary.main}`,
                                                    p: open.expand ? 2 : 0
                                                }}>
                                                    <Typography sx={{
                                                        fontWeight: 700,
                                                        fontSize: 20,
                                                    }}>Challan Details</Typography>
                                                    <ExplicitTable tableSize="small" columns={[{ name: "Fee Amount" }, { name: "Fee Type" }, { name: "Fee Description" }]} >
                                                        {challan.config.fee_details.map((det, i) => (
                                                            <StyledTableRow key={i}>
                                                                <StyledTableCell>{det.fee_type}</StyledTableCell>
                                                                <StyledTableCell>{det.fee_amount}</StyledTableCell>
                                                                <StyledTableCell>{det.fee_description}</StyledTableCell>
                                                            </StyledTableRow>
                                                        ))}
                                                    </ExplicitTable>
                                                </Collapse>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    </Fragment>
                                ))
                                : ""}
                        </ExplicitTable>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default PreviewStudent