import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { NavContent } from "../../components/NavContent/NavContent";
import { Sidebar } from "../../components/Sidebar.js/Sidebar";

export const DashBoard = () => {
  const [show, setShow] = useState(true);
  const [showBar, setShowBar] = useState(true);
  const toggle = () => {
    setShow(!show);
    setShowBar(!showBar);
  };

  return (
    <div className="flex bg-gray-300">
      {show && (
        <div
          className={`transition-all flex-none md:block md:w-[250px] md:relative h-[100vh] bg-white`}>
          <Sidebar></Sidebar>
        </div>
      )}
      <div className="w-full h-[100vh] overflow-y-auto">
        <div className="p-3 m-2">
          <NavContent toggle={toggle}></NavContent>
        </div>
        <div className="mx-2 px-3 flex-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};
