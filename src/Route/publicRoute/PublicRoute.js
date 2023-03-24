import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const { access_token } = useSelector((state) => state.authReducer);
  return access_token ? <Navigate to="/dashboard/product" /> : children;
};
