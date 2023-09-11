import { useState } from "react";
import { TextField, Button, Grid, Box, Typography, IconButton } from "@mui/material";
import { loginRequested } from "./loginSlice";
import { useDispatch } from 'react-redux';
import Logo from "./logo.jpg"
import { useTheme } from "@emotion/react";
import Icons from "../../common/icons";
import { handleAddLoading, handleRemoveLoading } from "../../common/commonSlice";
import { getExpiringVouchersApi } from "../../api";
const Login = () => {
    // admin@admin.com
    // P@ssw0rd123*
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [showPass, setShowPass] = useState(false)

    const theme = useTheme()
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
        }}>
            <Box sx={{
                p: 3,
                py: 5,
                boxShadow: theme.shadows[10],
                background: theme.palette.background.paper,
                [theme.breakpoints.up("sm")]: {
                    width: 350
                }
            }}>
                <Grid container>
                    {/* <Grid item xs={12} sx={{
                        textAlign: "center",
                        mb: 2
                    }}>
                        <img src={Logo} style={{ width: 150, borderRadius: "50%", boxShadow: theme.shadows[16] }} alt={"logo"} />
                    </Grid> */}
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <Typography sx={{
                            color: theme.palette.action.active,
                            fontSize: 32,
                            textAlign: "center"
                        }}>Login</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <TextField type='text' size="small" fullWidth placeholder="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <TextField type={!showPass ? 'password' : "text"} size="small" fullWidth placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: <IconButton onClick={() => setShowPass(!showPass)}>
                                    {!showPass ? <Icons.Visibility /> : <Icons.VisibilityOff />}
                                </IconButton>
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <Button fullWidth variant="contained" size="small" onClick={async () => {
                            dispatch(handleAddLoading())
                            await dispatch(loginRequested({ username: userName, password }));
                            await getExpiringVouchersApi()
                            dispatch(handleRemoveLoading())

                        }}>Login</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Login;