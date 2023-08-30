import { Container, Grid } from "@mui/material"
import AppBreadCrumbs from "../../components/BreadCrumbs"
import { BREADCRUMBS } from "./constants"


const Designations = () => {
    return (
        <Container maxWidth="xl">
            <AppBreadCrumbs pageTitle={"Designations"} paths={BREADCRUMBS} />
            <Grid container maxWidth="xl" >
                <Grid item xs={!2} md={12} sx={{
                    p: 2,
                    boxShadow: theme => theme.shadows[5],
                    background: theme => theme.palette.background.paper,
                    mb: 1
                }}>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Designations