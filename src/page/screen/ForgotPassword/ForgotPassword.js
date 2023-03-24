import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NavHome } from "../../../components/NavHome/NavHome";
import { useForgotPasswordMutation } from "../../../service/authJson";
import "./Forgot.scss";
export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, response] = useForgotPasswordMutation();
  const handleSubmit = () => {
    forgotPassword({ email });
  };
  useEffect(() => {
    if (response.isSuccess) {
      toast.success("Check your email");
    }
  }, [response.isSuccess]);
  return (
    <>
      <div className="bg-yellow-500 text-white">
        <NavHome></NavHome>
      </div>
      <div className="mt-4 max-w-xl mx-auto">
        <div className="text-field">
          <label for="username2">Email</label>
          <input
            autocomplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            id="username2"
            placeholder="Enter your Email"
          />
        </div>
        <div
          className="mt-4 px-3 py-2 bg-yellow-500 text-white inline-block cursor-pointer"
          onClick={handleSubmit}>
          Submit
        </div>
      </div>
    </>
  );
};
