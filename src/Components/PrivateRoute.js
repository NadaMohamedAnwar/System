
import React from 'react';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const token = sessionStorage.getItem('token');
  const userRoles = JSON.parse(sessionStorage.getItem('roles'));

  if (!token) {
    return <Navigate to="/" />;
  }

  if (roles && (!userRoles || !roles.some((role) => userRoles.includes(role)))) {
    return <Navigate to="/unauthorized" />;
  }

  return <Component {...rest} />;
};



export default PrivateRoute;
