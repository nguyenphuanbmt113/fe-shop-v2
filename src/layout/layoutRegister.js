import React from "react";
import { Outlet } from "react-router-dom";
import { RegisterHeader } from "../components/RegisterHeader/RegisterHeader";

export const LayoutRegister = () => {
  return (
    <>
      <div>
        <RegisterHeader></RegisterHeader>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </>
  );
};
