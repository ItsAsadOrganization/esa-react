import { Container, Grid, Toolbar } from "@mui/material"
import ClientsFragments from "./ClientsFragments"
import CommentsFragment from "./CommentsFragment"
import ProfileFragment from "./ProfileFragment"


const Queries = () => {
    return (
        <Container maxWidth="xl">
            <Grid container maxWidth="xl" >
                <ClientsFragments />
                <CommentsFragment />
                <ProfileFragment />
            </Grid>
        </Container>
    )
}

export default Queries