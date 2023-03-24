import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const orderService = createApi({
  reducerPath: "order",
  tagTypes: "order",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nguyenphuan-be-clothes.onrender.com/api/v1/orders",
    prepareHeaders: (headers, { getState }) => {
      const accessTokenAdmin = getState().authReducer.accessTokenAdmin;
      if (accessTokenAdmin) {
        headers.set("authorization", `Bearer ${accessTokenAdmin}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: (data) => {
        return {
          url: `/get-order?page=${data}`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
    getDetailOrder: builder.query({
      query: (data) => {
        return {
          url: `/get-detailorder/${data}`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
  }),
});

export const { useGetOrderQuery, useGetDetailOrderQuery } = orderService;
