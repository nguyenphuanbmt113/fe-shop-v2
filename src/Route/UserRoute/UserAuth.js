import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
export const UserAuth = () => {
  const { accessTokenUser } = useSelector((state) => state.authReducer);
  return accessTokenUser ? <Navigate to="/home" /> : <Outlet></Outlet>;
};
