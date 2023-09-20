import { Container, Button, Grid, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, FormLabel, FormControlLabel, Checkbox, Stack } from "@mui/material"
import ExplicitTable, { StyledTableCell, StyledTableRow } from "../../components/ExplicitTable"
import { Permissions } from "./constants"



const SetupRole = () => {
    return (
        <Container maxWidth="xl">
            <Grid container maxWidth="xl" sx={{
                p: 2,
                boxShadow: theme => theme.shadows[5],
                background: theme => theme.palette.background.paper,
                alignItems: "center"
            }} >

                <Grid item container xs={12} sm={12} md={5}>
                    <Grid item xs={12} sm={2} sx={{
                        display: "flex",
                        alignItems: "center"
                    }} >
                        <Typography>Role Name</Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField size="small" placeholder="Admin" fullWidth sx={{
                            '& .MuiInputBase-root': {
                                fontSize: 12
                            }
                        }} />
                    </Grid>
                </Grid>

                <Grid item container xs={12}>
                    <ExplicitTable columns={[{ name: "Page" }, { name: "Permissions" }]}>
                        {Permissions.map(per => (
                            <StyledTableRow>
                                <StyledTableCell sx={{ width: "40%", verticalAlign: 'text-top' }}>{per.page}</StyledTableCell>
                                <StyledTableCell>
                                    <Stack>
                                        <FormControlLabel
                                            label="All"
                                            control={
                                                <Checkbox
                                                    sx={{
                                                        padding: '3px !important'
                                                    }}
                                                    checked={per.permissions.filter(p => p.checked).length === per.permissions.length}
                                                    indeterminate={per.permissions.filter(p => p.checked).length !== per.permissions.length}
                                                />
                                            }
                                        />
                                        {per.permissions.map(pp => (
                                            <FormControlLabel
                                                sx={{ ml: 1.5 }}
                                                label={pp.label}
                                                value={pp.permission}
                                                control={
                                                    <Checkbox
                                                        sx={{
                                                            padding: '3px !important'
                                                        }}
                                                        checked={pp.checked}
                                                    />
                                                }
                                            />
                                        ))}
                                    </Stack>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}

                    </ExplicitTable>
                </Grid>

                <Grid item container xs={12} sm={12}>
                    <Button variant="contained" size="small" sx={{ px: 4 }}>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}
export default SetupRole