import React from "react";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../redux/reducers/authReducer";
import { FaBars } from "react-icons/fa";
import icons from "../../ulties/icons";
const { AiOutlineQuestionCircle } = icons;
export const NavContent = ({ toggle }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAdmin());
  };
  const navbartoggle = () => {
    toggle();
  };
  return (
    <div className="w-full flex items-center justify-between">
      <div className="navbartoggle cursor-pointer" onClick={navbartoggle}>
        <FaBars size={30} color="#537FE7"></FaBars>
      </div>
      <div className="flex items-center gap-3">
        <div className="md:w-[400px] w-[250px] h-[45px] bg-white px-5 rounded-full">
          <input
            type="text"
            className="w-full h-full rounded-full"
            placeholder="Tìm kiếm"
          />
        </div>
        <div>
          <AiOutlineQuestionCircle
            size={30}
            color={"red"}></AiOutlineQuestionCircle>
        </div>
        <div
          className="cursor-pointer px-2 py-1 bg-blue-500 text-white rounded-sm"
          onClick={handleLogout}>
          Đăng xuất
        </div>
      </div>
    </div>
  );
};
