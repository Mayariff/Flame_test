import s from "./Loader.module.css"
import { LinearProgress } from "@mui/material"

const Loader = () => {
  return (
    <div className={s.container}>
      <LinearProgress />
    </div>
  )
}

export default Loader
