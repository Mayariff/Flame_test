import { apiSlice } from "../People/ApiSlice"
import { personType } from "../../commonTypes"

export const personApiSlice = apiSlice.injectEndpoints({
  //tagTypes: ["people" , "people_search","person"],
  endpoints: (builder) => ({
    getPerson: builder.query<personType, string>({
      query: (id: string) => ({ url: `/${id}` }),
      providesTags: (res) => {
        const id = res?.url!.replace(/.*\/([^\/]+)\/?$/, "$1")
        return res
          ? [{ type: "people" as const, id },
            ]
          : [{ type: "people" as const, id: "person"  }]
      },
    }),
  }),
})
