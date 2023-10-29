import { PATH } from "../../app/routing"
import { Link } from "react-router-dom"

const EmptyList = () => {
  return (
    <>
      <h1> Sorry, Favorites List is empty.</h1>
      <p>
        Choose your favorites <Link to={PATH.peoples}>here</Link>.
      </p>
    </>
  )
}

export default EmptyList
