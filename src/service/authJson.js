import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authJson = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nguyenphuan-be-clothes.onrender.com/api/v1/user",
  }),
  endpoints: (builder) => ({
    createLogin: builder.mutation({
      query: (data) => {
        return {
          url: `/login`,
          method: "POST",
          body: data,
        };
      },
    }),
    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          url: `/forgotPassword`,
          method: "POST",
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: `/resetpassword`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),
    createLoginUser: builder.mutation({
      query: (data) => ({
        url: `/login-user`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    getUsers: builder.query({
      query: (data) => ({
        url: `/get-users`,
        method: "GET",
        params: data,
      }),
      providesTags: ["auth"],
    }),
    block: builder.mutation({
      query: (data) => ({
        url: `/block`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    unblock: builder.mutation({
      query: (data) => ({
        url: `/unblock`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useBlockMutation,
  useUnblockMutation,
  useGetUsersQuery,
  useCreateLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRegisterMutation,
  useCreateLoginUserMutation,
} = authJson;
