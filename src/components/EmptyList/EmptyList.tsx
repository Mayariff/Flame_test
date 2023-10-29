import { PATH } from "../../app/routing"
import { Link } from "react-router-dom"
import s from "./EmptyList.module.css"

const EmptyList = () => {
  return (
    <div className={s.container}>
      <h1> Sorry, Favorites List is empty.</h1>
      <p>
        Choose your favorites <Link to={PATH.peoples}>here</Link>.
      </p>
    </div>
  )
}

export default EmptyList
