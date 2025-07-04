import type { IBooks} from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    getBooks: builder.query<IBooks[], void>({
      query: () => "/books",
      transformResponse: (response: { data: IBooks[] }) => response.data,
    }),
    getBook: builder.query({
      query: (bookId) => `/books/${bookId}`,
     
    }),
    getBorrowSummary: builder.query({
      query: () => "/borrow",
   
    }),
    updateBook : builder.mutation({
      query: ({ id, payload }) => ({
      url: `/books/${id}`,
      method: "PUT",
      body: payload,
    }),

    })
  }),
});
export const { useGetBooksQuery,useGetBorrowSummaryQuery,useGetBookQuery ,useUpdateBookMutation} = baseApi;
