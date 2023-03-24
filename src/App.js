import React from "react";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/pagination";
import "./App.scss";
import { Login } from "./components/Login/Login";
import { ProtectChangeRoute } from "./components/ProtectChangeRoute/ProtectCHnageRoute";
import AutoScrollToTop from "./components/ScrollToTop/AutoScrollToTop";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { LayoutLogin } from "./layout/layoutLogin";
import { LayoutRegister } from "./layout/layoutRegister";
import { Category } from "./page/dashboard/Category";
import { DashBoard } from "./page/dashboard/DashBoard";
import { ProductEdit } from "./page/dashboard/EditProduct";
import { OrderDashBoard } from "./page/dashboard/OrderDashBoard";
import { OrderDetail } from "./page/dashboard/OrderDetail";
import { Product } from "./page/dashboard/Product";
import { ProductCreate } from "./page/dashboard/ProductCreate";
import { UserDashboard } from "./page/dashboard/UserDashboard";
import { ProductDetail } from "./page/ProductDetail/ProductDetail";
import { Account } from "./page/screen/Account/Account";
import { LoginUser } from "./page/screen/AuthLogin/LoginUser";
import { RegisterUser } from "./page/screen/AuthLogin/RegisterUser";
import { Cart } from "./page/screen/Cart/Cart";
import { CatProduct } from "./page/screen/CatProduct/CatProduct";
import { DetailOrder } from "./page/screen/DetailOrder/DetailOrder";
import { ForgotPassword } from "./page/screen/ForgotPassword/ForgotPassword";
import { ResetPassword } from "./page/screen/ForgotPassword/ResetPassword";
import { Home } from "./page/screen/Home/Home";
import { Order } from "./page/screen/Orders/Order";
import { OrderUser } from "./page/screen/OrderUser";
import { SearchProduct } from "./page/screen/SearchProduct/SearchProduct";
import { PrivateRoute } from "./Route/PrivateRoute";
import { UserAuth } from "./Route/UserRoute/UserAuth";
import { UserRouteProtect } from "./Route/UserRoute/UserRoute";
const App = () => {
  return (
    <>
      <ScrollToTop></ScrollToTop>
      <AutoScrollToTop>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/forgot-password"
            element={<ForgotPassword></ForgotPassword>}></Route>
          <Route
            path="/resetpassword/:tokenpassword"
            element={<ResetPassword></ResetPassword>}></Route>
          <Route element={<UserRouteProtect></UserRouteProtect>}>
            <Route path="/user" element={<Account></Account>}>
              <Route
                path="session_id/:CHECKOUT_SESSION_ID"
                element={<Order></Order>}></Route>
            </Route>
            <Route path="/cart" element={<Cart></Cart>}></Route>
            <Route
              path="/search/:keyword/:page"
              element={<SearchProduct></SearchProduct>}></Route>
            <Route
              path="/product/:id"
              element={<ProductDetail></ProductDetail>}></Route>
            <Route
              path="/category-product/:name"
              element={<CatProduct></CatProduct>}></Route>
            <Route
              path="/category-product/:name/:page"
              element={<CatProduct></CatProduct>}></Route>
          </Route>
          {/* Authentication */}
          <Route element={<UserAuth></UserAuth>}>
            <Route path="/login" element={<LayoutLogin></LayoutLogin>}>
              <Route path="/login" element={<LoginUser></LoginUser>}></Route>
            </Route>
            <Route path="/register" element={<LayoutRegister></LayoutRegister>}>
              <Route
                path="/register"
                element={<RegisterUser></RegisterUser>}></Route>
            </Route>
          </Route>
          <Route path="/auth/login" element={<Login></Login>}></Route>
          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashBoard></DashBoard>
              </PrivateRoute>
            }>
            <Route
              path="user"
              element={
                <PrivateRoute>
                  <UserDashboard></UserDashboard>
                </PrivateRoute>
              }></Route>
            <Route
              path="product"
              element={
                <PrivateRoute>
                  <Product></Product>
                </PrivateRoute>
              }></Route>
            <Route
              path="product/:page"
              element={
                <PrivateRoute>
                  <Product></Product>
                </PrivateRoute>
              }></Route>
            <Route
              path="product/edit/:id"
              element={
                <PrivateRoute>
                  <ProductEdit></ProductEdit>
                </PrivateRoute>
              }></Route>
            <Route
              path="create-product"
              element={<ProductCreate></ProductCreate>}></Route>
            <Route
              path="order"
              element={<OrderDashBoard></OrderDashBoard>}></Route>
            <Route
              path="order/:page"
              element={<OrderDashBoard></OrderDashBoard>}></Route>
            <Route
              path="order-details/:id"
              element={<OrderDetail></OrderDetail>}></Route>
            <Route path="category" element={<Category></Category>}></Route>
            <Route
              path="category/:page"
              element={<Category></Category>}></Route>
            <Route path="*" element={<Product></Product>}></Route>
          </Route>
          {/* Account */}
          <Route path="/user" element={<Account></Account>}>
            <Route
              path="detail-order/:id"
              element={<DetailOrder></DetailOrder>}></Route>
            <Route path="order" element={<OrderUser></OrderUser>}></Route>
            <Route path="order/:page" element={<OrderUser></OrderUser>}></Route>
            <Route path="*" element={<OrderUser></OrderUser>}></Route>
          </Route>
        </Routes>
      </AutoScrollToTop>
    </>
  );
};

export default App;
