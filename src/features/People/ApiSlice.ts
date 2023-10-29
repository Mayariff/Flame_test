import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query"
import { peopleResType } from "./types"
import { createObj } from "../../healpers"
import { errorType } from "../../commonTypes"

export const baseURl = "https://swapi.dev/api/people"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: retry(fetchBaseQuery({ baseUrl: baseURl }), {
    maxRetries: 3,
  }),
  tagTypes: ["people"],
  endpoints: (builder) => ({
    getAllPeople: builder.query<peopleResType, string>({
      query: (page: number = 1) => `?page=${page}`,
      providesTags: (res, err: errorType) => {
        if (err) return [{ type: "people", id: err.data.detail }]
        return res
          ? [
              ...res.results.map((el) => ({ type: "people", id: el.id })),
              { type: "people", id: "people-list" },
            ]
          : [{ type: "people", id: "people-list" }]
      },
      transformResponse: (res) => ({
        ...res,
        results: res.results.map((r) => createObj(r)),
      }),
    }),
    searchPeople: builder.query<peopleResType, string>({
      query: (value: string) => `?search=${value}`,
      providesTags: (res, err: errorType, page: number = 1) => {
        if (err) return [{ type: "people", id: err.data.detail }]
        return res
          ? [
              ...res.results.map((el) => ({
                type: "people_search",
                id: el.id,
              })),
              { type: "people_search", id: "people_search_list" },
            ]
          : [{ type: "people_search", id: "people_search_list" }]
      },
      transformResponse: (res) => ({
        ...res,
        results: res.results.map((r) => createObj(r)),
      }),
    }),
  }),
})
