import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const paymentService = createApi({
  reducerPath: "payment",
  tagTypes: "payment",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nguyenphuan-be-clothes.onrender.com/api/v1/payment",
    prepareHeaders: (headers, { getState }) => {
      const accessTokenUser = getState().authReducer.accessTokenUser;
      if (accessTokenUser) {
        headers.set("authorization", `Bearer ${accessTokenUser}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    sendPayment: builder.mutation({
      query: (cart) => {
        return {
          url: `/create-checkout-session`,
          method: "POST",
          body: cart,
        };
      },
      invalidatesTags: ["payment"],
    }),
    verifyPayment: builder.query({
      query: (data) => {
        return {
          url: `/verify-payment/${data}`,
          method: "GET",
        };
      },
      invalidatesTags: ["payment"],
    }),
  }),
});

export const { useSendPaymentMutation, useVerifyPaymentQuery } = paymentService;
