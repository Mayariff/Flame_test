import { ChangeEventHandler, memo, useState } from "react"
import { useDebounce } from "../../healpers"
import SearchList from "./SearchList"

type propsType = {
  isFetching: boolean
  value: string
  changeInput: (value: string) => void
}
const SearchInput = memo(({ isFetching, value, changeInput }: propsType) => {

  const [inFocus, setInFocus] = useState<boolean>(false)
  const debouncedValue = useDebounce(value, 500)

  const changeInputHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    changeInput(e.currentTarget.value)
  }

  const onBlurHandler = () => setInFocus(false)
  const onFocusHandler = () => setInFocus(true)

  let isOpen = inFocus && !!debouncedValue

  return (
    <div onBlur={onBlurHandler}>
      <input
        value={value}
        onChange={changeInputHandler}
        onFocus={onFocusHandler}
        disabled={isFetching}
      />
      {isOpen && <SearchList isOpen={isOpen} value={debouncedValue} />}
    </div>
  )
})

export default SearchInput
