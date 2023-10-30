import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query"
import { peopleResType } from "./types"
import { createObj } from "../../healpers"

export const baseURl = "https://swapi.dev/api/people"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: retry(fetchBaseQuery({ baseUrl: baseURl }), {
    maxRetries: 3,
  }),
  tagTypes: ["people" ,"people_search"],
  endpoints: (builder) => ({
    getAllPeople: builder.query<peopleResType, string>({
      query: (page: string | number = 1) => `?page=${page}`,
      providesTags: (res) => {
        return res
          ? [
              ...res.results.map((el) => ({ type: "people" as const, id: el.id })),
              { type: "people" as const, id: "people-list" },
            ]
          : [{ type: "people" as const, id: "people-list" }]
      },
      transformResponse: (res: peopleResType) => ({
        ...res,
        results: res.results.map((r) => createObj(r)),
      }),
    }),
    searchPeople: builder.query<peopleResType, string>({
      query: (value: string) => `?search=${value}`,
      providesTags: (res) => {
        return res
          ? [
              ...res.results.map((el) => ({
                type: "people_search" as const,
                id: el.id,
              })),
              { type: "people_search" as const, id: "people_search_list" },
            ]
          : [{ type: "people_search" as const, id: "people_search_list" }]
      },
      transformResponse: (res: peopleResType) => ({
        ...res,
        results: res.results.map((r) => createObj(r)),
      }),
    }),
  }),
})
