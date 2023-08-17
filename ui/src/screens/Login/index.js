import { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { loginRequested } from "./loginSlice";
import { useDispatch } from 'react-redux';
const Login = () => {
    const [userName, setUserName] = useState('admin@admin.com');
    const [password, setPassword] = useState('P@ssw0rd123*');
    const dispatch = useDispatch();
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TextField type='text' fullWidth placeholder="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
                <TextField type='password' fullWidth placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
                <Button fullWidth variant="contained" onClick={async () => { await dispatch(loginRequested({ username: userName, password })); }}>Login</Button>
            </Grid>
        </Grid>
    );
}

export default Login;