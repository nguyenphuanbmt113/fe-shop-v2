import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const categoryService = createApi({
  reducerPath: "category",
  tagTypes: "category",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nguyenphuan-be-clothes.onrender.com/api/v1/category",
    prepareHeaders: (headers, { getState }) => {
      const accessTokenAdmin = getState().authReducer.accessTokenAdmin;
      if (accessTokenAdmin) {
        headers.set("authorization", `Bearer ${accessTokenAdmin}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => {
        return {
          url: `/create`,
          method: "POST",
          body: { title: data },
        };
      },
      invalidatesTags: ["category"],
    }),
    getCategory: builder.query({
      query: (data) => {
        return {
          url: `/get-catequery?page=${data.page}`,
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),
    getAllCategory: builder.query({
      query: () => {
        return {
          url: `/all`,
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),
    getRanCategory: builder.query({
      query: () => {
        return {
          url: `/random-category`,
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),
    putCategory: builder.mutation({
      query: (data) => {
        return {
          url: `/update/${data.id}`,
          method: "PUT",
          body: { title: data.input },
        };
      },
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (data) => {
        return {
          url: `/delete/${data.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["category"],
    }),
    allCategory: builder.query({
      query: () => {
        return {
          url: `/all`,
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useGetAllCategoryQuery,
  useGetRanCategoryQuery,
  useAllCategoryQuery,
  usePutCategoryMutation,
  useDeleteCategoryMutation,
} = categoryService;
