import React from "react";
import PropTypes from 'prop-types';
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { isUserLoggedIn, getUserPermissions, getUserRole } from '../../screens/Login/loginSlice';
import { APP_ROUTES } from "./constants";

const ProtectedRoute = ({ roles, permission, redirectPath = "/", children }) => {
  const isLoggedIn = useSelector(isUserLoggedIn);
  const userPermissions = useSelector(getUserPermissions);
  const userRole = useSelector(getUserRole);
  

  // console.log(userPermissions.find(up => up.page.toLowerCase() === permission).permissions[0].checked)

  if (isLoggedIn && roles.includes(userRole)) {
    return children ? children : <Outlet />;
  }

  return <Navigate to={redirectPath} replace />;
};

ProtectedRoute.propTypes = {
  roles: PropTypes.array,
  permission: PropTypes.string,
  redirectPath: PropTypes.string
}

export default ProtectedRoute;