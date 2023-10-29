import React, { useCallback, useEffect, useState } from "react"
import { PATH } from "../../app/routing"
import { PersonTransformedType } from "../../commonTypes"
import { cls } from "./customLocalStorage"
import { BtnMenu, EmptyList, TableHeaderRow, TableRow } from "../../components"
import { Button, Paper, Table, TableBody, TableContainer } from "@mui/material"
import s from "./Favorites.module.css"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"

const Favorites = () => {
  const [items, setItems] = useState<PersonTransformedType[]>(
    [] as PersonTransformedType[],
  )

  useEffect(() => {
    const favorites = cls.getAllFavorite()
    setItems((prev) => favorites)
  }, [])

  const removeItem = useCallback((id: string) => {
    cls.deleteFavorite(id)
    setItems((prev) => {
      return prev.filter((el) => el.id !== id)
    })
  }, [])

  return (
    <div className={s.container}>
      <div className={s.menuContainer}>
      <Button href={PATH.peoples} startIcon={<ExitToAppIcon />}>
        See All People
      </Button>
      </div>
      {!items[0] ? (
        <EmptyList />
      ) : (
        <TableContainer
          component={Paper}
          sx={{ minWidth: 400, width: `80%`, margin: "4px auto" }}
        >
          <Table sx={{ width: `100%` }} aria-label="customized table">
            <TableHeaderRow btnColName={"remove favorite"} />
            <TableBody>
              {items.map((r: PersonTransformedType) => (
                <TableRow
                  key={r.id}
                  row={r}
                  id={r.id}
                  child={
                    <BtnMenu
                      btnName={"Delete"}
                      handelClickBtn={() => removeItem(r.id)}
                    />
                  }
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}

export default Favorites
