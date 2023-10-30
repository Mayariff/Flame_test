import { ChangeEventHandler, memo, useState } from "react"
import { useDebounce } from "../../healpers"
import SearchList from "./SearchList"
import { Box, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"

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
    <Box onBlur={onBlurHandler} sx={{position: 'relative', width:240}}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          position: 'relative'
        }}
      >
        <SearchIcon sx={{color: "#1976d2"}}/>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Person"
          value={value}
          onChange={changeInputHandler}
          onFocus={onFocusHandler}
          disabled={isFetching}
        />
      </Paper>
      {isOpen && <SearchList value={debouncedValue} />}
    </Box>
  )
})

export default SearchInput
