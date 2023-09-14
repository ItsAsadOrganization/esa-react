import { Container, Fab, Grid, Toolbar, Tooltip } from "@mui/material"
import ClientsFragments from "./ClientsFragments"
import CommentsFragment from "./CommentsFragment"
import ProfileFragment from "./ProfileFragment"
import Icons from "../../common/icons"
import { useNavigate } from "react-router"
import React from "react"
import { socket } from "../.."
import { handleChangeQueryList } from "./querySlice"
import { useDispatch } from "react-redux"


const Queries = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    React.useEffect(() => {
        socket.on("query-update", (data) => {
            console.log({ data })
            dispatch(handleChangeQueryList(data.queries))
        });

    }, [socket])


    return (
        <Container maxWidth={false} sx={{ p: '0 !important' }}>
            <Grid container disableGutters>
                <ClientsFragments />
                <CommentsFragment />
                <ProfileFragment />
            </Grid>

            <Tooltip placement="top" title="Back To Home">
                <Fab onClick={() => navigate("/")} color="primary" sx={{
                    position: "absolute",
                    right: 50,
                    bottom: 50
                }}>
                    <Icons.Home />
                </Fab>
            </Tooltip>
        </Container>
    )
}

export default Queries