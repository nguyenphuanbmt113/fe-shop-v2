import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../service/authJson";
import "./AuthUser.scss";
import { UseForm } from "../../../hook/UseForm";
import { toast } from "react-toastify";
export const RegisterUser = () => {
  // const [state, setState] = useState({
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   password: "",
  //   mobile: null,
  // });
  const { state, handleChangeState } = UseForm({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: null,
  });
  const navigate = useNavigate();
  const [registerActioon, response] = useRegisterMutation();
  const handleSubmit = () => {
    registerActioon(state);
  };
  useEffect(() => {
    if (response.isSuccess) {
      toast.success("created success");
      navigate("/login", {
        state: {
          email: state.email,
          password: state.password,
        },
      });
    }
  }, [navigate, response.isSuccess, state.email, state.password]);
  useEffect(() => {
    if (response.isError) {
      toast.error(response?.error?.data?.mes);
    }
  }, [response?.error?.data, response.isError]);
  return (
    <>
      <div className="bg-blue-400 bg-register">
        <div className="max-w-[1200px] mx-auto px-4 py-12">
          <div className="grid grid-cols-5">
            <div className="col-span-5 col-start-1 md:col-span-3">
              <div className="p-7 rounded-md bg-white shadow-graylight">
                <div className="text-2xl">Đăng Ký</div>
                <div className="mt-4">
                  <input
                    name="firstname"
                    value={state.firstname}
                    onChange={handleChangeState}
                    type="text"
                    placeholder="Họ Người Dùng"
                    className="p-3 w-full border border-gray-300 focus:border-gray:500  bg-gray-200"
                  />
                </div>
                <div className="mt-4">
                  <input
                    name="lastname"
                    value={state.lastname}
                    onChange={handleChangeState}
                    type="text"
                    placeholder="Tên Người Dùng"
                    className="p-3 w-full border border-gray-300 focus:border-gray:500  bg-gray-200"
                  />
                </div>
                <div className="mt-4">
                  <input
                    name="mobile"
                    value={state.mobile}
                    onChange={handleChangeState}
                    type="text"
                    placeholder="Số điện thoại"
                    className="p-3 w-full border border-gray-300 focus:border-gray:500  bg-gray-200"
                  />
                </div>
                <div className="mt-4">
                  <input
                    name="email"
                    value={state.email}
                    onChange={handleChangeState}
                    type="email"
                    placeholder="Email"
                    className="p-3 w-full border border-gray-300 focus:border-gray:500  bg-gray-200"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="password"
                    placeholder="Password"
                    className="p-3 w-full border border-gray-300 focus:border-gray:500  bg-gray-200"
                    name="password"
                    value={state.password}
                    onChange={handleChangeState}
                  />
                  <div className="min-h-[1rem] mt-1 text-red-500 text-sm"></div>
                </div>

                <input
                  type="button"
                  value={`${!response.isLoading ? "Đăng Ký" : "Loading..."}`}
                  className="mt-4 bg-blue-400 w-full text-center uppercase py-4 px-2 text-white text-sm"
                  onClick={handleSubmit}></input>
                <div className="mt-8 text-center text-sm font-medium text-gray-500 dark:text-gray-300">
                  Bạn đã có tài khoản?
                  <Link
                    to="/login"
                    className="text-orange hover:underline cursor-pointer">
                    Đăng Nhập
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
