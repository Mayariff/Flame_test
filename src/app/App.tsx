import { Link } from "react-router-dom"
import { PATH } from "./routing"

function App() {
  return (
    <div>
      <Link to={PATH.peoples}>People</Link>
      <Link to={PATH.favorites}>Favorites</Link>
    </div>
  )
}

export default App
