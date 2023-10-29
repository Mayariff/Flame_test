import { PersonTransformedType } from "../../commonTypes";

export type responseType<T> = {
  count: number
  next: null | string
  previous: null | string
  results: T
}

export type peopleResType = responseType<PersonTransformedType>



