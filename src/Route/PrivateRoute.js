import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { accessTokenAdmin } = useSelector((state) => state.authReducer);
  return accessTokenAdmin ? children : <Navigate to="/auth/login" />;
};
