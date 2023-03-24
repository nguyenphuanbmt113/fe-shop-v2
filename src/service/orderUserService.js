import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const orderUserService = createApi({
  reducerPath: "orderUser",
  tagTypes: "orderUser",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nguyenphuan-be-clothes.onrender.com/api/v1/orders-user",
    prepareHeaders: (headers, { getState }) => {
      const accessTokenUser = getState().authReducer.accessTokenUser;
      if (accessTokenUser) {
        headers.set("authorization", `Bearer ${accessTokenUser}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOrderUser: builder.query({
      query: ({ page, userId }) => {
        return {
          url: `/get-order?page=${page}&userId=${userId}`,
          method: "GET",
        };
      },
      providesTags: ["orderUser"],
    }),
    getDetailOrderUser: builder.query({
      query: (data) => {
        return {
          url: `/get-detailorder/${data}`,
          method: "GET",
        };
      },
      providesTags: ["orderUser"],
    }),
    postReview: builder.mutation({
      query: (data) => {
        return {
          url: `/add-review`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["orderUser"],
    }),
    getReview: builder.query({
      query: (data) => {
        return {
          url: `/get-reviews?productId=${data}`,
          method: "GET",
        };
      },
      providesTags: ["orderUser"],
    }),
  }),
});

export const {
  useGetOrderUserQuery,
  useGetDetailOrderUserQuery,
  usePostReviewMutation,
  useGetReviewQuery,
} = orderUserService;
