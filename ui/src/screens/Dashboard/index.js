import { Alert, Box, Container, Grid, Snackbar, Typography } from '@mui/material'
import AppBreadCrumbs from '../../components/BreadCrumbs';
import NothingFound from '../../components/NothingFound';
import Icons from '../../common/icons';
import { BREADCRUMBS } from './constants';
import { useSelector } from 'react-redux'
import { getNotifications } from '../../common/commonSlice';
import React from 'react';

const Dashboard = () => {
    const notifications = useSelector(getNotifications)
   
    return (
        <Container maxWidth="xl">
            <AppBreadCrumbs pageTitle={"Dashboard"} paths={BREADCRUMBS} />

        
            <Grid container maxWidth="xl" >
                <Grid item xs={!2} md={12} sx={{
                    p: 2,
                    boxShadow: theme => theme.shadows[5],
                    background: theme => theme.palette.background.paper,
                    mb: 1
                }}>

                    <Box sx={{
                        borderRadius: 4,
                        border: theme => `1px solid ${theme.palette.primary.main}`,
                        minHeight: 250,
                        minWidth: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        p: 3,
                        boxSizing: "border-box"
                    }}>
                        <Box sx={{
                            background: "#eee",
                            width: 90,
                            height: 90,
                            p: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                        }}>
                            <Box sx={{
                                background: "#ccc",
                                width: 60,
                                height: 60,
                                p: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "50%",
                            }}>
                                < Icons.Dashboard sx={{
                                    width: 48,
                                    height: 48,
                                    color: "#555"
                                }} />
                            </Box>
                        </Box>
                        <Typography sx={{
                            fontFamily: theme => theme.typography.fontFamily,
                            color: theme => theme.palette.customFontColor.main,
                            fontWeight: 500,
                            letterSpacing: "1px",
                            fontSize: 14,
                            textAlign: "center"
                        }}>Nothing here yet.<br />Will be designed at later stage</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Dashboard;