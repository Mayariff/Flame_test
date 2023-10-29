import { memo } from "react"

type Tprops = {
  errorText: string
}
const Error = memo(({ errorText }: Tprops) => {
  return (
    <div>
      <h1>{errorText || "Some error"}</h1>
    </div>
  )
})

export default Error
