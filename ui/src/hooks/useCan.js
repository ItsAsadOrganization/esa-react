
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { getUserPermissions } from "../screens/Login/loginSlice";

const useCan = (url) => {
    const [data, setData] = useState(null);
    const permissions = useSelector(getUserPermissions)
    useEffect(() => {
        if (permissions[url]) {
            setData(permissions[url])
        } else {
            setData(false)
        }
    }, [url]);

    return data;
};

export default useCan;