import { apiSlice } from "../People/ApiSlice"
import { errorType, personType } from "../../commonTypes"

export const personApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["person", "people"],
  endpoints: (builder) => ({
    getPerson: builder.query<personType, string>({
      query: (id: string) => ({ url: `/${id}` }),
      providesTags: (res, err: errorType) => {
        if (err) return [{ type: "person", id: err.data.detail }]
        return res
          ? [{ type: "person", id: res.url.replace(/.*\/([^\/]+)\/?$/, "$1") }]
          : [{ type: "people", id: "people-list" }]
      },
    }),
  }),
})
