import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Navigation from './Navigation';
import { handleLogout, isUserLoggedIn, getUserPermissions, getUserRole } from '../screens/Login/loginSlice';
import { APP_ROUTES } from './Navigation/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLoadings, getTheme, handleChangeTheme, getNotifications } from '../common/commonSlice';
import Icons from '../common/icons'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useTheme } from '@emotion/react';
import { Backdrop, Badge, CircularProgress, Tooltip } from '@mui/material';
import { openErrorToast } from '../common/toast';
import { updateNotyApi } from '../api';

const settings = [];
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    // ...(open && {
    //     marginLeft: drawerWidth,
    //     width: `calc(100% - ${drawerWidth}px)`,
    //     transition: theme.transitions.create(['width', 'margin'], {
    //         easing: theme.transitions.easing.sharp,
    //         duration: theme.transitions.duration.enteringScreen,
    //     }),
    // }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            minHeight: "100%",
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(7),
                },
            }),
        },
    }),
);

const Layout = (props) => {


    const dispatch = useDispatch();
    const isLoggedIn = useSelector(isUserLoggedIn);
    const userPermissions = useSelector(getUserPermissions);
    const userRole = useSelector(getUserRole);
    const loadings = useSelector(getLoadings);
    const notificaiotns = useSelector(getNotifications);

    // const selectedTheme = useSelector(getTheme)

    const theme = useTheme()

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const [anchorElNoty, setAnchorElNoty] = React.useState(null);



    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate();


    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };


    return (
        <Box sx={{ display: 'flex' }}>
            {console.log({ theme })}
            {/* <CssBaseline /> */}
            {isLoggedIn && (
                <>
                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography>{!open ? "EGC" : "Encore Group Of Colleges"}</Typography>
                        </Toolbar>
                        <Divider />
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            flexGrow: 1
                        }}>
                            <List component="nav"
                                sx={{

                                    '&& .Mui-selected, && .Mui-selected:hover': {
                                        background: "none",
                                        '&, & .MuiListItemIcon-root': {
                                            color: theme.palette.action.active,
                                        },
                                        '&, & .MuiListItemText-root .MuiListItemText-primary': {
                                            color: theme.palette.action.active,
                                        },
                                    },
                                    '& .MuiListItemButton-root:hover': {
                                        transition: ".3s all ease_in-out",
                                        bgcolor: 'none',
                                        background: "none",
                                        '&, & .MuiListItemIcon-root': {
                                            color: theme.palette.customFontColor.light,

                                        },
                                        '&, & .MuiListItemText-root .MuiListItemText-primary': {
                                            color: theme.palette.customFontColor.light,
                                        },
                                    },
                                    "& .MuiListItemButton-root": {
                                        transition: ".3s all ease_in-out",
                                        "&, & .MuiListItemText-root .MuiListItemText-primary": {
                                            color: theme.palette.customFontColor.main,
                                        },
                                        "&, & .MuiListItemIcon-root": {
                                            color: theme.palette.customFontColor.main,
                                        }
                                    }

                                }}>
                                {APP_ROUTES.filter(route => route.showInNav).map(route => route.roles.includes(userRole) ? (

                                    <ListItemButton
                                        disableRipple
                                        selected={route.url.toLowerCase() === window.location.pathname.toLowerCase()}
                                        onClick={() => { navigate(route.url.toLowerCase()); }} key={route.label}

                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: "30px",
                                            }}>
                                            <route.icon sx={{
                                                fontSize: "1.25rem"
                                            }} />
                                        </ListItemIcon>
                                        {open && <ListItemText
                                            primaryTypographyProps={{
                                                fontSize: '0.8125rem',
                                                fontWeight: 600
                                            }}
                                            primary={
                                                route.label.includes("-") ?
                                                    route.label.split("-").map((l) => (
                                                        l.charAt(0).toUpperCase() + l.slice(1) + " "
                                                    ))
                                                    : route.label.charAt(0).toUpperCase() + route.label.slice(1)
                                            } />}
                                    </ListItemButton>
                                ) : null)}
                                {/* {mainListItems} */}
                                {/* {secondaryListItems} */}
                            </List>
                            <List component="nav" sx={{
                                color: theme.palette.error.main,
                                '&& .Mui-selected, && .Mui-selected:hover': {
                                    background: "none",
                                    '&, & .MuiListItemIcon-root': {
                                        color: theme.palette.action.active,
                                    },
                                    '&, & .MuiListItemText-root .MuiListItemText-primary': {
                                        color: theme.palette.action.active,
                                    },
                                },
                                '& .MuiListItemButton-root:hover': {
                                    transition: ".3s all ease_in-out",
                                    bgcolor: 'none',
                                    background: "none",
                                    '&, & .MuiListItemIcon-root': {
                                        color: theme.palette.customFontColor.light,

                                    },
                                    '&, & .MuiListItemText-root .MuiListItemText-primary': {
                                        color: theme.palette.customFontColor.light,
                                    },
                                },
                                "& .MuiListItemButton-root": {
                                    transition: ".3s all ease_in-out",
                                    "&, & .MuiListItemText-root .MuiListItemText-primary": {
                                        color: theme.palette.customFontColor.main,
                                    },
                                    "&, & .MuiListItemIcon-root": {
                                        color: theme.palette.customFontColor.main,
                                    }
                                }

                            }}>
                                <ListItemButton
                                    disableRipple
                                    onClick={() => {
                                        dispatch(handleLogout());
                                    }}
                                >
                                    <ListItemIcon sx={{
                                        minWidth: "30px",
                                    }}> <Icons.AccountCircleOutlined sx={{
                                        fontSize: "1.25rem",
                                    }} /> </ListItemIcon>

                                    {open && <ListItemText
                                        primaryTypographyProps={{
                                            fontSize: '0.8125rem',
                                            fontWeight: 600
                                        }}
                                        primary={"Log Out"} />}
                                </ListItemButton>
                            </List>
                        </Box>
                    </Drawer>
                </>
            )
            }
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.mainBackground.main
                            : theme.palette.background.default,
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                {isLoggedIn && <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                color: theme.palette.customFontColor.main,
                                marginRight: 2,
                            }}
                        >
                            <MenuIcon />
                        </IconButton>


                    </Box>

                    <Box>
                        <IconButton onClick={(e) => {
                            setAnchorElNoty(e.currentTarget);
                        }}>
                            <Badge badgeContent={notificaiotns.filter(n => n.is_read === "0").length} color="primary">
                                {notificaiotns.filter(n => n.is_read === "0").length > 0 ?  <Icons.NotificationsActive /> :  <Icons.NotificationsActiveOutlined />}
                            </Badge>
                        </IconButton>

                        <Menu
                            id="lock-menu"
                            anchorEl={anchorElNoty}
                            open={Boolean(anchorElNoty)}
                            onClose={() => {
                                setAnchorElNoty(null)
                            }}
                            sx={{
                                '& .MuiPaper-root': {
                                    minWidth: 400,
                                    width: 400,
                                    maxHeight: 500,
                                    overflow: "auto",
                                    p: 0
                                },
                                '& .MuiList-root': {
                                    padding: 0
                                }
                            }}
                            MenuListProps={{
                                'aria-labelledby': 'lock-button',
                                role: 'listbox',
                            }}
                        >
                            {notificaiotns.map((n, i) => (
                                <MenuItem key={i} sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "start",
                                    background: n.is_read === "0" ? "#ccc" : "#fff"
                                }}
                                    onClick={async () => {
                                        try {
                                            await updateNotyApi({ id: n.id })
                                        } catch (err) {
                                            openErrorToast(err)
                                        }
                                    }}
                                >
                                    {console.log(n.is_read)}
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <Typography sx={{
                                            fontWeight: 700
                                        }}>{n.title}</Typography>
                                        <Typography sx={{
                                            fontSize: 12,
                                            fontWeight: 700
                                        }}>{new Date(n.createdAt).toLocaleDateString()}</Typography>
                                    </Box>
                                    <Typography>{n.description}</Typography>
                                </MenuItem>
                            ))}

                        </Menu>
                    </Box>
                </Toolbar>}
                <Navigation />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.tooltip + 1 }}
                    open={loadings > 0}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

            </Box>
            {/* <ProgressBar progressBarOpen={loadings > 0} /> */}
        </Box >
    );
}

export default Layout;