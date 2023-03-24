import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
export const UserRouteProtect = () => {
  const { accessTokenUser } = useSelector((state) => state.authReducer);
  return accessTokenUser ? <Outlet></Outlet> : <Navigate to="/login" />;
};
