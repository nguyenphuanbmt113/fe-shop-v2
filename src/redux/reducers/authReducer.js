import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
const access_token = localStorage.getItem("access_token");
const access_token_user = localStorage.getItem("access_token_user");
const initialState = {
  accessTokenAdmin: access_token ? access_token : null,
  accessTokenUser: access_token_user ? access_token_user : null,
  userTokenVerify: verifyToken("access_token_user") || "",
  isAuthentication: false,
};
function verifyToken(keyname) {
  const storage = localStorage.getItem(keyname);
  if (storage) {
    const decodeToken = jwt_decode(storage);
    const expiresIn = new Date(decodeToken.expiresIn * 1000);
    if (new Date() > expiresIn) {
      localStorage.removeItem(keyname);
      return null;
    } else {
      return decodeToken;
    }
  } else {
    return null;
  }
}

export const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessTokenAdmin = action?.payload?.access_token;
      state.isAuthentication = true;
    },
    setAccessTokenUser: (state, action) => {
      state.accessTokenUser = action?.payload;
      state.userTokenVerify = verifyToken(action.payload);
    },
    logoutUser: (state, action) => {
      localStorage.removeItem("access_token_user");
      state.accessTokenUser = null;
    },
    logoutAdmin: (state, action) => {
      localStorage.removeItem("access_token");
      state.accessTokenAdmin = null;
    },
  },
});
export const { setAccessToken, setAccessTokenUser, logoutUser, logoutAdmin } =
  authSlice.actions;

export default authSlice.reducer;
