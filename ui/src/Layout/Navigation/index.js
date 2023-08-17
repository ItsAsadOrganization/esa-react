import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { APP_ROUTES } from './constants';
import Login from "../../screens/Login";
import { isUserLoggedIn } from "../../screens/Login/loginSlice";
import { useSelector } from "react-redux";
import { ROUTES } from './constants';

const Navigation = () => {
    const isLoggedIn = useSelector(isUserLoggedIn);
    return (
        <Routes>

            <Route index element={isLoggedIn ? <Navigate to={`/${ROUTES.dashboard}`} replace /> : <Login />} />
            {APP_ROUTES.map((route) => (
                <Route
                    key={route.label}
                    path={route.url}
                    element={
                        route.isProtected ?
                        (<ProtectedRoute
                            redirectPath={route.redirectPath}
                            roles={route.roles}
                            permission={route.permission}
                        >
                            <route.screen />
                        </ProtectedRoute>)
                        : (<route.screen />)
                    }
                />
            ))}
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
    );
}

export default Navigation;