import { PATH } from "./routing"
import { Button } from "@mui/material"
import s from "./App.module.css"

function App() {
  return (
    <div className={s.container}>
      <Button
        variant="contained"
        size={"large"}
        sx={{
          minWidth: 140,
        }}
        href={PATH.peoples}
      >
        People
      </Button>
      <Button
        variant="contained"
        color={"secondary"}
        size={"large"}
        sx={{
          minWidth: 140,
        }}
        href={PATH.favorites}
      >
        Favorites
      </Button>
    </div>
  )
}

export default App
