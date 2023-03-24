import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { NavHome } from "../../../components/NavHome/NavHome";
import { menuAccount } from "../../../ulties/menu";
import { useSearchParams } from "react-router-dom";
import { useVerifyPaymentQuery } from "../../../service/paymentService";
// import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../../redux/reducers/cartReducer";
export const Account = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = params.get("session_id");
  const { data, isSuccess } = useVerifyPaymentQuery(id, {
    skip: id ? false : true,
  });
  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("cart");
      navigate(`/user/order`);
      dispatch(emptyCart());
    }
  }, [dispatch, isSuccess, navigate]);
  return (
    <div>
      <div>
        <NavHome></NavHome>
      </div>
      <div className="flex">
        <div className="flex-none h-[85vh] lg:w-[300px] bg-white border">
          <ul className="flex flex-col item-center">
            {menuAccount &&
              menuAccount.length > 0 &&
              menuAccount.map((item) => {
                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "bg-blue-400 text-white"
                        : ""
                    }>
                    <li className="p-3 flex items-start gap-3 hover:bg-blue-400 hover:text-white hover:transition-all">
                      <div>{item.icon}</div>
                      <div>{item.text}</div>
                    </li>
                  </NavLink>
                );
              })}
          </ul>
        </div>
        <div className="flex-1 h-[85vh] overflow-y-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};
