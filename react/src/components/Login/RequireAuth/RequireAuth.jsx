import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";

import React from 'react'

const RequireAuth = ({ children }) => {
    const { auth } = useContext(AuthContext);
    const location = useLocation();
  
    if (!auth?.accessToken) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  };
  
export default RequireAuth;