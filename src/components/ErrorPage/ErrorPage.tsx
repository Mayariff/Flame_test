import { useRouteError } from "react-router"

const ErrorPage = () => {
  const error = useRouteError<{ statusText?: string; message?: string }>()

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{error?.statusText || error?.message}</p>
    </div>
  )
}

export default ErrorPage
