import React from "react";
import { Link } from "react-router-dom";

export const LoginHeader = () => {
  return (
    <>
      <div className="header h-[84px] shadow">
        <div className="h-[100%] max-w-[1240px] mx-auto px-5 flex items-center justify-between">
          <nav className="flex items-center gap-3">
            <Link
              to="/"
              className="block uppercase tracking-wide text-blue-500 text-xl font-bold">
              Clothes Hunter
            </Link>
            <Link className="text-backBold text-[1rem]">Đăng Nhập</Link>
          </nav>
          <nav>
            <span>Bạn cần giúp đỡ?</span>
          </nav>
        </div>
      </div>
    </>
  );
};
