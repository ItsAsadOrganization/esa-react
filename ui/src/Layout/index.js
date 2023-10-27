import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Navigation from './Navigation';
import { handleLogout, isUserLoggedIn, getUserPermissions, getUserRole, getUserName } from '../screens/Login/loginSlice';
import { APP_ROUTES, ROUTES } from './Navigation/constants';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import { Alert, Avatar, Backdrop, Badge, Button, CircularProgress, Container, Icon, Snackbar, Tooltip } from '@mui/material';
import { openErrorToast } from '../common/toast';
import { updateNotyApi } from '../api';
import { getItem, setItem } from '../utils/storage';

const drawerWidth = 240;

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
    const username = useSelector(getUserName);
    const location = useLocation()

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
    const [snackOpen, setSnackOpen] = React.useState(true)

    React.useEffect(() => {
        setItem("notifcations", notificaiotns.length)
    }, [])


    React.useEffect(() => {
        if (notificaiotns.length > 0 && notificaiotns.length > getItem("notifcations")) {
            setSnackOpen(true)
        }
    }, [notificaiotns])


    return (
        <Box sx={{ display: 'flex' }}>
            {(isLoggedIn) && (
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

                                {
                                    APP_ROUTES.filter(route => {
                                        return Object.keys(userPermissions).includes(route.permission) && route.showInNav
                                    }).map(route =>
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
                                    )

                                }
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
                {(isLoggedIn) && <Toolbar component={Container} maxWidth="xl"
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
                                marginRight: 1,
                            }}
                        >
                            <Icons.MenuOpen />
                        </IconButton>
                        <Typography sx={{
                            color: theme => theme.palette.customFontColor.main 
                        }}>Students Control Panel</Typography>


                    </Box>

                    <Box>
                        <IconButton onClick={(e) => {
                            setAnchorElNoty(e.currentTarget);
                        }}>
                            <Badge badgeContent={notificaiotns.filter(n => !n.is_read).length} color="primary">
                                {notificaiotns.filter(n => !n.is_read).length > 0 ? <Icons.NotificationsActive /> : <Icons.NotificationsActiveOutlined />}
                            </Badge>
                        </IconButton>
                        <Button endIcon={<Icons.AccountCircleOutlined sx={{
                            width: 38,
                            height: 38,
                        }} />}

                            onClick={(e) => handleOpenUserMenu(e)}>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-end",
                                alignItems: "flex-end"
                            }}

                            >
                                <Typography sx={{
                                    fontSize: 16,
                                    fontWeight: 700,
                                    lineHeight: 1.3
                                }}>{username}</Typography>
                                <Typography sx={{
                                    fontSize: 10,
                                    lineHeight: 1.0
                                }}>{userRole}</Typography>
                            </Box>
                        </Button>

                        <Menu
                            id="lock-menu"
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            onClose={() => {
                                handleCloseUserMenu()
                            }}
                            sx={{
                                '& .MuiPaper-root': {
                                    // minWidth: 400,
                                    // width: 400,
                                    // maxWidth: 400,
                                    // maxHeight: 500,
                                    // overflow: "auto",
                                    // p: 5,
                                },
                                '& .MuiList-root': {
                                    padding: 0,
                                    position: "relative"
                                }
                            }}
                            MenuListProps={{
                                'aria-labelledby': 'lock-button',
                                role: 'listbox',
                            }}
                        >
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Change Password</MenuItem>
                            <Divider sx={{ m: "0 !important" }} />
                            <MenuItem>Log Out</MenuItem>

                        </Menu>

                        <Menu
                            id="lock-menu"
                            anchorEl={anchorElNoty}
                            open={Boolean(anchorElNoty)}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            onClose={() => {
                                setAnchorElNoty(null)
                            }}
                            sx={{
                                '& .MuiPaper-root': {
                                    minWidth: 400,
                                    width: 400,
                                    maxWidth: 400,
                                    maxHeight: 500,
                                    overflow: "auto",
                                    p: 0,
                                },
                                '& .MuiList-root': {
                                    padding: 0,
                                    position: "relative"
                                }
                            }}
                            MenuListProps={{
                                'aria-labelledby': 'lock-button',
                                role: 'listbox',
                            }}
                        >
                            {notificaiotns.length > 0 ? <>
                                {notificaiotns.slice(0, 10).map((n, i) => (
                                    <>
                                        <MenuItem key={i} sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "start",
                                            background: !n.is_read ? "#ccc" : "#fff",
                                            whiteSpace: "normal",
                                            maxWidth: "100%"
                                        }}
                                            onClick={async () => {
                                                try {
                                                    await updateNotyApi({ id: n.id })
                                                } catch (err) {
                                                    openErrorToast(err)
                                                }
                                            }}
                                        >
                                            <Box sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1
                                            }}>
                                                <Avatar sx={{ bgcolor: theme => !n.is_read ? theme.palette.info.light : "inheirt" }}>
                                                    <Icons.NotificationsActive />
                                                </Avatar>
                                                <Box>
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
                                                </Box>
                                            </Box>
                                        </MenuItem>
                                        <Divider sx={{ m: "0 !important" }} />
                                    </>
                                ))}
                                {notificaiotns.length > 10 && <MenuItem component={Link} to={ROUTES.notifications} sx={{
                                    position: "sticky",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    justifyContent: "center",
                                    background: "#ccc",
                                    '&:hover': {
                                        background: "#ccc"
                                    }
                                }}>
                                    Show All {notificaiotns.length} Notifications
                                </MenuItem>}
                            </> : <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: "center",
                                justifyContent: 'center',
                                height: 200,
                                gap: 1,
                            }}>
                                <Icons.NotificationsActiveOutlined sx={{
                                    width: 50,
                                    height: 50
                                }} />
                                <Typography>No Notifications Found</Typography>
                            </Box>}

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