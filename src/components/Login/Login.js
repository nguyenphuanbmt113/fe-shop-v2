import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateLoginMutation } from "../../service/authJson";
// import { useCreateLoginMutation } from "../../service/authJson";
import { setAccessToken } from "../../redux/reducers/authReducer";
import { useDispatch } from "react-redux";
import "./Login.scss";
export const Login = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "andbo2003@gmail.com",
    password: "anbmt113",
  });
  const navigate = useNavigate();
  const [createLogin, response] = useCreateLoginMutation();
  const handleInputs = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  //sử lý login
  const handleLogin = (e) => {
    e.preventDefault();
    createLogin(state);
  };
  //error
  const error = response?.error?.data?.mes;
  useEffect(() => {
    if (response.isSuccess) {
      localStorage.setItem("access_token", response?.data?.access_token);
      dispatch(setAccessToken(response?.data));
      navigate("/dashboard/product");
    }
  }, [dispatch, navigate, response?.data, response.isSuccess]);
  return (
    <div className="p-5 bg-blue-400 h-[100vh]">
      <div className="bt-form-login-simple-1 bg-white">
        <nav className="flex items-center justify-center gap-3 mb-4">
          <div className={`relative`}>
            <img
              src="https://www.coolmate.me/images/logo-coolmate-birthday.svg"
              alt=""
              className=""
            />
            <span className="absolute w-[30px] h-[30px] rounded-full bg-red-500 text-white flex items-center justify-center  top-0 right-[-30px] text-[10px]">
              fake
            </span>
          </div>
        </nav>
        <form className="form" autoComplete="off" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className="form-input"
              value={state.email}
              onChange={handleInputs}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu *</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="form-input"
              value={state.password}
              onChange={handleInputs}
            />
          </div>
          {error && <p className="text-red-500 h-[4px]">Không có thẩm quyền</p>}
          <div className="form-meta">
            <Link className="form-link">Quên mật khẩu</Link>
          </div>
          <button type="submit" className="form-btn">
            {response && !response.isLoading ? (
              "Đăng nhập"
            ) : (
              <div className="loader"></div>
            )}
          </button>
        </form>
        <div className="form-option">
          Bạn đã có tài khoản
          <Link>Tạo tài khoản</Link>
        </div>
      </div>
    </div>
  );
};
