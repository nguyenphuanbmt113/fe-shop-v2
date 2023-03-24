import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productService = createApi({
  reducerPath: "product",
  tagTypes: "product",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nguyenphuan-be-clothes.onrender.com/api/v1/product",
    prepareHeaders: (headers, { getState }) => {
      const accessTokenAdmin = getState().authReducer.accessTokenAdmin;
      if (accessTokenAdmin) {
        headers.set("authorization", `Bearer ${accessTokenAdmin}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => {
        return {
          url: `/create`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["product"],
    }),
    getProduct: builder.query({
      query: (data) => {
        console.log("data:", data);
        return {
          url: `/get-product`,
          method: "GET",
          params: { ...data },
        };
      },
      providesTags: ["product"],
    }),
    getProductCategory: builder.query({
      query: ({ name, page }) => {
        return {
          url: `/cat-product/${name}/${page}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    getProductSearch: builder.query({
      query: ({ keyword, page }) => {
        return {
          url: `/search/${keyword}/${page}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    getProductById: builder.query({
      query: (id) => {
        return {
          url: `/${id}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    putProduct: builder.mutation({
      query: (data) => {
        return {
          url: `/update/${data.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  usePutProductMutation,
  useGetProductQuery,
  useGetProductSearchQuery,
  useGetProductCategoryQuery,
  useGetProductByIdQuery,
} = productService;
