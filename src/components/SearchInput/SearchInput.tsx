import { ChangeEventHandler, useState } from "react"
import { useDebounce } from "../../healpers"
import SearchList from "./SearchList"

const SearchInput = () => {
  const [inputValue, setInputValue] = useState<string>("")
  const [inFocus, setInFocus] = useState<boolean>(false)
  const debouncedValue = useDebounce(inputValue, 500)

  const changeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.currentTarget.value)
  }

  const onBlurHandler = () => setInFocus(false)
  const onFocusHandler = () => setInFocus(true)

  let isOpen = inFocus && !!debouncedValue

  return (
    <div onBlur={onBlurHandler}>
      <input
        value={inputValue}
        onChange={changeInput}
        onFocus={onFocusHandler}
      />
      {isOpen && <SearchList isOpen={isOpen} value={debouncedValue} />}
    </div>
  )
}

export default SearchInput
