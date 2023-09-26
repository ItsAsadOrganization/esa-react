import React from "react";
import PropTypes from 'prop-types';
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { isUserLoggedIn, getUserPermissions, getUserRole } from '../../screens/Login/loginSlice';
import { APP_ROUTES } from "./constants";
import Unauthorized from "../../screens/Unauthorized";

const ProtectedRoute = ({ roles, permission, redirectPath = "/", children }) => {
  const isLoggedIn = useSelector(isUserLoggedIn);
  const userPermissions = useSelector(getUserPermissions);
  const userRole = useSelector(getUserRole);
  if (isLoggedIn) {
    if(Object.keys(userPermissions).includes(permission)){
      return children ? children : <Outlet />;
    }else{
      <Unauthorized />
    }
  }

  return <Navigate to={redirectPath} replace />;
};

ProtectedRoute.propTypes = {
  roles: PropTypes.array,
  permission: PropTypes.string,
  redirectPath: PropTypes.string
}

export default ProtectedRoute;