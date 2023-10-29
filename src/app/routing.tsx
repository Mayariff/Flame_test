import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import { ErrorPage } from "../components"
import { People } from "../features/People"
import { Person } from "../features/Person"
import { Favorites } from "../features/Favorites"

export enum PATH {
  peoples = "/peoples",
  favorites = "/favorites",
  person = "/peoples/:id",
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: PATH.peoples,
    element: <People />,
  },
  {
    path: PATH.person,
    element: <Person />,
  },
  {
    path: PATH.favorites,
    element: <Favorites />,
  },
])
