import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { sidebarMenu } from "../../ulties/menu";
export const Sidebar = () => {
  return (
    <div>
      <div className="py-3 flex items-center justify-center">
        <nav className="flex items-center gap-3">
          <Link to="/dashboard/product" className={`relative`}>
            <img
              src="https://www.coolmate.me/images/logo-coolmate-birthday.svg"
              alt=""
              className=""
            />
            <span className="absolute w-[30px] h-[30px] rounded-full bg-red-500 text-white flex items-center justify-center  top-0 right-[-30px] text-[10px]">
              fake
            </span>
          </Link>
        </nav>
      </div>
      <div className="mt-5 flex flex-col text-sm mx-3">
        {sidebarMenu.length > 0 &&
          sidebarMenu.map((item) => {
            return (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive === true
                    ? "py-2 px-[25px] font-medium text-[#205295] flex gap-3 items-center hover:bg-gray-100 bg-gray-200"
                    : "py-2 px-[25px] font-medium text-[#32323d] flex gap-3 items-center hover:bg-gray-100"
                }
                key={item.id}>
                {item.icon}
                <span>{item.text}</span>
              </NavLink>
            );
          })}
      </div>
    </div>
  );
};
