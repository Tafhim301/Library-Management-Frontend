import type { IBooks } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://library-management-backend-rosy.vercel.app/api" }),
  tagTypes: ["Book", "Borrow"],
  endpoints: (builder) => ({
    getBooks: builder.query<
      {
        data: IBooks[];
        meta: {
          filter : string
          total: number;
          page: number;
          limit: number;
          totalPages: number;
        };
      },
      { page?: number; limit?: number; filter?: string } | void
    >({
      query: (params) => {
        const queryString = params
          ? `?${new URLSearchParams({
            filter : (params.filter || ""),
              page: String(params.page || 1),
              limit: String(params.limit || 10),
            })}`
          : "";
        return `/books${queryString}`;
      },
    
      providesTags: ["Book"],
    
    }),

    getBook: builder.query({
      query: (bookId) => `/books/${bookId}`,
    }),
    getBorrowSummary: builder.query({
      query: () => "/borrow",
      providesTags: ["Borrow"],
    }),
    borrowBook: builder.mutation({
      query: ({ payload }) => ({
        url: `/borrow`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Borrow", "Book"],
    }),
    addBook: builder.mutation({
      query: ({ payload }) => ({
        url: `/books`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Book"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});
export const {
  useGetBooksQuery,
  useGetBorrowSummaryQuery,
  useGetBookQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useAddBookMutation,
} = baseApi;
