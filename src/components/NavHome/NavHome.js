import React from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/reducers/authReducer";
import { toggleSearchbar } from "../../redux/reducers/globalReducer";
import { Search } from "../Search/Search";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import DarkMode from "../DarkMode/DarkMode";
export const NavHome = ({ detailpage }) => {
  const dispatch = useDispatch();
  const { accessTokenUser } = useSelector((state) => state.authReducer);
  const { searchBar } = useSelector((state) => state.globalReducer);
  const { items } = useSelector((state) => state.cartReducer);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const handleShow = () => {
    dispatch(toggleSearchbar());
  };
  const tocartPage = () => {
    navigate("/cart");
  };
  const toAccount = () => {
    navigate("/user/order");
  };

  return (
    <>
      <div className={`header h-[84px] bg-white relative`}>
        <div className="h-[100%] max-w-[1240px] mx-auto px-5 flex items-center justify-between">
          <nav className="flex items-center gap-3">
            <Link to="/" className={`relative flex-none`}>
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
          {!accessTokenUser ? (
            <nav>
              <Link to="/login" className="cursor-pointer">
                Đăng Nhập
              </Link>
            </nav>
          ) : (
            <nav className="flex items-center gap-6">
              <div onClick={handleShow} className="cursor-pointer">
                <BsSearch size={20}></BsSearch>
              </div>
              <div className="cursor-pointer relative" onClick={tocartPage}>
                <AiOutlineShoppingCart size={30}></AiOutlineShoppingCart>
                {items !== 0 && (
                  <span className="h-5 w-5 flex items-center justify-center rounded-full text-[10px] text-white bg-red-400 absolute top-[-10px] right-[-10px]">
                    {items}
                  </span>
                )}
              </div>
              <div className="cursor-pointer relative" onClick={toAccount}>
                <AiOutlineUser size={30}></AiOutlineUser>
              </div>
              <span className="cursor-pointer" onClick={handleLogout}>
                Hỗ trợ khách hàng
              </span>
              <div>
                <DarkMode></DarkMode>
              </div>
              <span className="cursor-pointer" onClick={handleLogout}>
                Đăng Xuất
              </span>
            </nav>
          )}
        </div>
      </div>
      {searchBar && <Search></Search>}
    </>
  );
};
