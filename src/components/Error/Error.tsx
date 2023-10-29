import { memo } from "react"
import s  from "./Error.module.css";

type propsType = {
  errorText: string
}
const Error = memo(({ errorText }: propsType) => {
  return (
    <div className={s.container}>
      <h1>{errorText || "Some error"}</h1>
    </div>
  )
})

export default Error
