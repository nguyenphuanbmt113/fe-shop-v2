import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UseForm } from "../../../hook/UseForm";
import { setAccessTokenUser } from "../../../redux/reducers/authReducer";
import { useCreateLoginUserMutation } from "../../../service/authJson";
import "./AuthUser.scss";
export const LoginUser = () => {
  const [isFormIncomplete, setIsFormIncomplete] = useState(true);
  const { state, handleChangeState } = UseForm({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loginUser, response] = useCreateLoginUserMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (response.isSuccess) {
      toast.success("Login success");
      localStorage.setItem("access_token_user", response?.data?.access_token);
      dispatch(setAccessTokenUser(response.data.access_token));
      navigate("/");
    }
  }, [response.isSuccess]);
  useEffect(() => {
    if (response.isError) {
      toast.error(response?.error?.data?.mes);
    }
  }, [response?.error?.data, response.isError]);
  const handleSubmit = () => {
    loginUser(state);
  };
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    e.preventDefault();
    alert("The window is closing now!");
    if (e) {
      e.returnValue = "";
    }
    return "";
  };
  return (
    <>
      <div className="bg-blue-400 bg-login">
        <div className="max-w-[1200px] mx-auto px-4 py-12">
          <div className="grid grid-cols-5">
            <div className="col-span-5 col-start-1 md:col-span-3">
              <div className="p-7 rounded-md bg-white shadow-graylight">
                <div className="text-2xl">Đăng Nhập</div>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Email"
                    className="p-3 w-full border border-gray-300 focus:border-gray:500  bg-gray-200"
                    value={state.email}
                    onChange={handleChangeState}
                    name="email"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="password"
                    placeholder="Password"
                    className="p-3 w-full border border-gray-300 focus:border-gray:500  bg-gray-200"
                    value={state.password}
                    onChange={handleChangeState}
                    name="password"
                  />
                  <div className="min-h-[1rem] mt-1 text-red-500 text-sm"></div>
                </div>

                <input
                  type={"button"}
                  value={`${!response.isLoading ? "Đăng Nhập" : "Loading..."}`}
                  className="mt-4 bg-blue-400 w-full text-center uppercase py-4 px-2 text-white text-sm"
                  onClick={handleSubmit}></input>
                <div className="mt-8 text-center text-sm font-medium text-gray-500 dark:text-gray-300">
                  Bạn chưa có tài khoản?
                  <Link
                    to="/register"
                    className="text-orange hover:underline cursor-pointer">
                    Đăng Ký
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
