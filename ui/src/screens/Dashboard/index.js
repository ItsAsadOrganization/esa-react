import { Alert, Box, Container, Grid, Snackbar, Typography } from '@mui/material'
import AppBreadCrumbs from '../../components/BreadCrumbs';
import NothingFound from '../../components/NothingFound';
import Icons from '../../common/icons';
import { BREADCRUMBS } from './constants';
import { useSelector } from 'react-redux'
import { getNotifications } from '../../common/commonSlice';
import React from 'react';
import { APP_ROUTES } from '../../Layout/Navigation/constants';
import ProtectedRoute from '../../Layout/Navigation/ProtectedRoute';

const Dashboard = () => {
    const notifications = useSelector(getNotifications)

    return (
        <Container maxWidth="xl">
            <Grid container>
                {APP_ROUTES.map(route => (
                    <Typography></Typography>
                ))}
            </Grid>
        </Container>
    );
}

export default Dashboard;