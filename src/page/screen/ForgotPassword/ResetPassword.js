import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { NavHome } from "../../../components/NavHome/NavHome";
import { useResetPasswordMutation } from "../../../service/authJson";
import "./Forgot.scss";
export const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { tokenpassword } = useParams();
  const [resetPassword, response] = useResetPasswordMutation();

  const handleChangePassword = () => {
    resetPassword({
      newPassword: password,
      tokenReset: tokenpassword,
    });
  };
  useEffect(() => {
    if (response.isSuccess) {
      navigate("/login");
    }
  }, [response.isSuccess, navigate]);
  return (
    <>
      <div className="bg-yellow-500 text-white">
        <NavHome></NavHome>
      </div>
      <div className="mt-4 max-w-xl mx-auto">
        <div className="text-field">
          <label for="username2">Password</label>
          <input
            autocomplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="username2"
            placeholder="Enter your New Password"
          />
        </div>
        <div
          className="mt-4 px-3 py-2 bg-blue-400 text-white inline-block cursor-pointer"
          onClick={handleChangePassword}>
          Change
        </div>
      </div>
    </>
  );
};
